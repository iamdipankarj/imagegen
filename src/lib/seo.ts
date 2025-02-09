import type { Metadata } from "next";

interface MetaDataProps extends Metadata {
  canonicalUrlRelative?: string
}

const siteDescription = "Let AI design the perfect image for you. Just describe your image and get it in seconds, create inteiors, headshots, restore old photographs, upscale images and more."

export function getMetaData({
  title = "imagegen | Your personal AI Image Generator",
  description = siteDescription,
  canonicalUrlRelative = process.env.HOST_NAME
}: MetaDataProps = {}): Metadata {
  return {
    metadataBase: new URL("https://imagegen"),
    title,
    description,
    manifest: "/site.webmanifest",
    applicationName: "imagegen",
    twitter: {
      creator: "@iamdipankarj",
      title: "imagegen",
      description: description!
    },
    alternates: {
      canonical: canonicalUrlRelative
    },
    authors: {
      name: "imagegen"
    },
    other: {
      "msapplication-TileColor": "#ffffff",
      "msapplication-config": "/browserconfig.xml",
      "msapplication-TileImage": "/mstile-150x150.png",
      "theme-color": "#41c289"
    },
    keywords: "ai, saas, portrait, text to image, restore photos, upscale photos, interior design, imagegen, photoworks, photoworksai, ai photo generator",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: process.env.HOST_NAME,
      siteName: "imagegen",
      images: [
        {
          url: `${process.env.HOST_NAME}/banner.png`,
          width: 1200,
          height: 630,
          alt: "imagegen"
        }
      ]
    }
  }
}

export function getStructuredData() {
  return {
    "@context": "http://schema.org",
    "@type": "SoftwareApplication",
    "name": "imagegen",
    "description": siteDescription,
    "image": `${process.env.HOST_NAME}/banner.png`,
    "url": process.env.HOST_NAME,
    "author": {
      "@type": "Website",
      "name": "imagegen"
    },
    "datePublished": "2024-02-02",
    "applicationCategory": "DeveloperApplication",
    "offers": [
      {
        "@type": "Offer",
        "price": "14.00",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "price": "15.00",
        "priceCurrency": "USD"
      }
    ]
  }
}
