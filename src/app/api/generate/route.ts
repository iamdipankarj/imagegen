import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function POST(req: Request, ) {
  const userEmail = "john@doe.com"

  // Check if user is logged in
  if (!userEmail) {
    return NextResponse.json(
      { message: "unauthorized" },
      { status: 401 }
    )
  }

  // Get user from DB
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail
    },
    select: {
      credits: true
    }
  });

  // Check if user has any credits left
  if (user?.credits === 0) {
    return NextResponse.json(
      { message: "no_credits" },
      { status: 400 }
    )
  }

  // If they have credits, decrease their credits by one and continue
  await prisma.user.update({
    where: {
      email: userEmail
    },
    data: {
      credits: {
        decrement: 1
      }
    }
  });

  // Do the magic here
  try {
    const payload = await req.json();
    const { imageUrl, renderCount } = payload;

    const prompt = "my awesome prompt here";

    // POST request to Replicate to start the image restoration generation process
    let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`
      },
      body: JSON.stringify({
        version: "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
        input: {
          image: imageUrl,
          prompt,
          num_samples: renderCount,
          image_resolution: "512",
          scale: 20,
          a_prompt: "best quality, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning, interior design",
          n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        }
      })
    });

    let jsonStartResponse = await startResponse.json();

    let endpointUrl = jsonStartResponse.urls.get;
    const originalImage = jsonStartResponse.input.image;
    const roomId = jsonStartResponse.id;

    // GET request to get the status of the image restoration process & return the result when it's ready
    let generatedImage: string | null = null;
    while (!generatedImage) {
      // Loop in 1s intervals until the alt text is ready
      let finalResponse = await fetch(endpointUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + process.env.REPLICATE_API_KEY,
        },
      });
      let jsonFinalResponse = await finalResponse.json();

      if (jsonFinalResponse.status === "succeeded") {
        generatedImage = jsonFinalResponse.output[1] as string;
      } else if (jsonFinalResponse.status === "failed") {
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    if (generatedImage) {
      await prisma.room.create({
        data: {
          replicateId: roomId,
          user: {
            connect: {
              email: userEmail
            }
          },
          inputImage: originalImage,
          outputImage: generatedImage,
          prompt: prompt,
        },
      });
    } else {
      throw new Error("Failed to restore image");
    }

    if (generatedImage) {
      return NextResponse.json(
        { orginalImage: originalImage, generatedImage: generatedImage},
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { message: "Failed to restore image" },
        { status: 500 }
      )
    }
  } catch (error) {
    await prisma.user.update({
      where: {
        email: userEmail
      },
      data: {
        credits: {
          increment: 1,
        },
      },
    });
    return NextResponse.json(
      { message: JSON.stringify(error) },
      { status: 500 }
    )
  }
}
