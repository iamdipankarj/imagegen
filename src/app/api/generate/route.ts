import { getFormattedError } from "@/lib/errorHandler";
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from "next/server";
import { fal } from "@fal-ai/client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

export const maxDuration = 300;

export const dynamic = 'force-dynamic'

const modelList: Record<string, string> = {
  restore: "fal-ai/image-apps-v2/photo-restoration",
  text2image: "fal-ai/flux-pro/kontext/text-to-image",
  upscale: "fal-ai/seedvr/upscale/image",
  photomaker: "ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4",
  colorize: "fal-ai/ddcolor"
};

export async function POST(req: Request) {
  const { isAuthenticated } = await auth()

  if (!isAuthenticated) {
    return NextResponse.json(
      { message: "unauthorized" },
      { status: 401 }
    )
  }
  
  try {
    const payload = await req.json();
    const {
      imageUrl,
      renderCount,
      model,
      prompt,
      aspectRatio,
      styleName,
      images
    } = payload;

    const input = {
      prompt,
      guidance_scale: 3.5,
      num_inference_steps: 28,
      num_images: parseInt(renderCount, 10),
      output_format: "png",
      safety_tolerance: "6",
      enable_safety_checker: true,
      aspect_ratio: aspectRatio,
      image_url: imageUrl
    } as Record<string, any>;

    if (model === "upscale") {
      input.upscale_factor = 2
    }

    const response = await fal.subscribe(modelList[model], {
      input,
      logs: false
    });

    let outputImages: string[] = []

    if (Array.isArray(response?.data?.images)) {
      outputImages = response.data.images as string[]
    } else if (response?.data?.image && typeof response.data.image === 'object') {
      outputImages = [response.data.image]
    }

    return NextResponse.json(
      {
        originalImage: imageUrl,
        outputs: outputImages.map((image: any) => ({
          url: image.url || null,
          width: image.width || 1024,
          height: image.height || 1024
        }))
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: getFormattedError(error) },
      { status: 500 }
    )
  }
}
