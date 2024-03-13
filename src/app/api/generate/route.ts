import prisma from "@/lib/db";
import { getFormattedError } from "@/lib/errorHandler";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

const modelList: Record<string, string> = {
  restore: "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
  interior: "854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b",
  text2image: "ea1addaab376f4dc227f5368bbd8eff901820fd1cc14ed8cad63b29249e9d463",
  upscale: "660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a"
};

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
  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: userEmail
  //   },
  //   select: {
  //     credits: true
  //   }
  // });

  // // Check if user has any credits left
  // if (user?.credits === 0) {
  //   return NextResponse.json(
  //     { message: "no_credits" },
  //     { status: 400 }
  //   )
  // }

  // // If they have credits, decrease their credits by one and continue
  // await prisma.user.update({
  //   where: {
  //     email: userEmail
  //   },
  //   data: {
  //     credits: {
  //       decrement: 1
  //     }
  //   }
  // });

  // Do the magic here
  try {
    const payload = await req.json();
    const { imageUrl, renderCount, model, prompt, resolution } = payload;

    let input = {}

    if (model === "restore") {
      input = {
        img: imageUrl,
        version: "v1.4",
        scale: 2
      }
    } else if (model === "interior") {
      input = {
        image: imageUrl,
        prompt: "interior prompt",
        num_samples: renderCount,
        image_resolution: "512",
        scale: 20,
        a_prompt: "best quality, interior, cinematic photo, ultra-detailed, ultra-realistic, award-winning, interior design",
        n_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
      }
    } else if (model === "text2image") {
      input = {
        width: parseInt(resolution),
        height: parseInt(resolution),
        negative_prompt: "longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality",
        prompt,
        num_outputs: parseInt(renderCount),
        num_inference_steps: 75,
        num_inference_steps_prior: 25
      }
    } else if (model === "upscale") {
      input = {
        jpeg: 40,
        image: imageUrl,
        noise: 15,
        task_type: "Real-World Image Super-Resolution-Large"
      }
    }

    // POST request to Replicate to start the image restoration generation process
    let startResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_KEY}`
      },
      body: JSON.stringify({
        version: modelList[model],
        input
      })
    });

    let jsonStartResponse = await startResponse.json();

    let endpointUrl = jsonStartResponse.urls.get;
    const originalImage = jsonStartResponse.input?.image || null;
    const roomId = jsonStartResponse.id;

    // GET request to get the status of the image restoration process & return the result when it's ready
    let outputs: string[] | null = null;
    while (!outputs) {
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
        if (Array.isArray(jsonFinalResponse.output)) {
          outputs = jsonFinalResponse.output;
        } else {
          outputs = [jsonFinalResponse.output];
        }
      } else if (jsonFinalResponse.status === "failed") {
        break;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // if (generatedImage) {
    //   await prisma.room.create({
    //     data: {
    //       replicateId: roomId,
    //       user: {
    //         connect: {
    //           email: userEmail
    //         }
    //       },
    //       inputImage: originalImage,
    //       outputImage: generatedImage,
    //       prompt: "interior prompt",
    //     },
    //   });
    // } else {
    //   throw new Error("Failed to restore image");
    // }

    if (outputs) {
      return NextResponse.json(
        { originalImage, outputs },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { message: "Failed to restore image" },
        { status: 500 }
      )
    }
  } catch (error) {
    // await prisma.user.update({
    //   where: {
    //     email: userEmail
    //   },
    //   data: {
    //     credits: {
    //       increment: 1,
    //     },
    //   },
    // });
    return NextResponse.json(
      { message: getFormattedError(error) },
      { status: 500 }
    )
  }
}
