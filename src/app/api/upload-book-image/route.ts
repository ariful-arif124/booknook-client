import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const allowedTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

type ImgBBResponse = {
  success?: boolean;
  data?: {
    url?: string;
  };
  error?: {
    message?: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Authentication required." },
        { status: 401 }
      );
    }

    const apiKey = process.env.IMGBB_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "Image upload service is not configured." },
        { status: 503 }
      );
    }

    const body = await request.formData();
    const image = body.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Please select a book cover image." },
        { status: 400 }
      );
    }

    if (
      !allowedTypes.has(image.type) ||
      image.size < 1 ||
      image.size > MAX_IMAGE_SIZE
    ) {
      return NextResponse.json(
        { success: false, message: "Upload a JPG, PNG, or WEBP image smaller than 5 MB." },
        { status: 400 }
      );
    }

    const uploadBody = new FormData();
    uploadBody.append("image", image, image.name);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        body: uploadBody,
        cache: "no-store",
        signal: AbortSignal.timeout(30000),
      }
    );

    const result = (await response.json()) as ImgBBResponse;
    const url = result.data?.url;

    if (!response.ok || !result.success || !url?.startsWith("https://")) {
      return NextResponse.json(
        {
          success: false,
          message: result.error?.message || "Image upload failed. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Book cover upload failed:", error);

    return NextResponse.json(
      { success: false, message: "Unable to upload the image right now." },
      { status: 500 }
    );
  }
}
