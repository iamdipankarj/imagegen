import { getFormattedError } from "@/lib/errorHandler";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const maxDuration = 300;

export const dynamic = 'force-dynamic'

const modelList: Record<string, string> = {
  restore: "9283608cc6b7be6b65a8e44983db012355fde4132009bf99d976b2f0896856a3",
  text2image: "ea1addaab376f4dc227f5368bbd8eff901820fd1cc14ed8cad63b29249e9d463",
  upscale: "660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a",
  photomaker: "ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
  colorize: "0da600fab0c45a66211339f1c16b71345d22f26ef5fea3dca1bb90bb5711e950"
};

export async function POST(req: Request, ) {
  const { userId } = auth();

  // Check if user is logged in
  if (!userId) {
    return NextResponse.json(
      { message: "unauthorized" },
      { status: 401 }
    )
  }

  const clerkUser = await currentUser();
  const userEmail = clerkUser?.emailAddresses[0]?.emailAddress;
  
  try {
    // Do the magic here
    const payload = await req.json();
    const {
      imageUrl,
      renderCount,
      model,
      prompt,
      resolution,
      styleName,
      inputImage1,
      inputImage2,
      inputImage3,
      inputImage4
    } = payload;

    let input: any = {}

    if (model === "restore") {
      input = {
        img: imageUrl,
        version: "v1.4",
        scale: 2
      }
    } else if (model === "colorize") {
      input = {
        input_image: imageUrl,
        model_name: "Stable",
        render_factor: 35
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
    }  else if (model === "photomaker") {
      input = {
        prompt: prompt + " img",
        num_steps: 50,
        style_name: styleName,
        num_outputs: Number(renderCount),
        guidance_scale: 5,
        negative_prompt: "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
        style_strength_ratio: 20,
        disable_safety_checker: true
      }
      if (inputImage1) {
        input.input_image = inputImage1;
      }
      if (inputImage2) [
        input.input_image2 = inputImage2
      ]
      if (inputImage3) {
        input.input_image3 = inputImage3;
      }
      if (inputImage4) {
        input.input_image4 = inputImage4;
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

    if (outputs) {
      return NextResponse.json(
        { originalImage, outputs },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { message: "Failed to generate image" },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { message: getFormattedError(error) },
      { status: 500 }
    )
  }
}
