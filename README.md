# 🖼️ ImageGen - AI Image Generator

An AI-powered image generator built with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and [fal.ai](https://fal.ai/) models.  
This project allows users to create AI images, upload files seamlessly with [FilePond](https://pqina.nl/filepond/) and [Cloudflare R2](https://www.cloudflare.com/en-in/developer-platform/products/r2/), and enjoy a clean interface styled using [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/7ba5c558-ae1b-4d16-8265-98786ab12d71/deploy-status)](https://app.netlify.com/projects/splendid-paprenjak-e8601a/deploys)

---

## 🚀 Features

- ⚡ AI image generation using [fal.ai](https://fal.ai/)
- 📂 Image uploads with [FilePond](https://pqina.nl/filepond/) + [Cloudflare R2](https://www.cloudflare.com/en-in/developer-platform/products/r2/)
- 🎨 Modern UI with [TailwindCSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- 🔑 Authentication with [Clerk](https://clerk.com/) and Google OAuth
- 🛠️ Built on [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:iamdipankarj/imagegen.git
cd imagegen
yarn install
```

---

## ⚙️ Environment Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

### Required Environment Variables

| Variable | Description |
|----------|-------------|
| `HOST_NAME` | Hostname for your app (default: `localhost`). |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk **Publishable Key**. Create a project on [Clerk Dashboard](https://dashboard.clerk.com/) → API Keys. |
| `CLERK_SECRET_KEY` | Clerk **Secret Key** from [Clerk Dashboard](https://dashboard.clerk.com/). |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL` | Redirect path after login (default: `/`). |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL` | Redirect path after signup (default: `/`). |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in route (default: `/login`). |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up route (default: `/register`). |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | Fallback login redirect (default: `/login`). |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | Fallback signup redirect (default: `/register`). |
| `SOA_INTERNAL_KEY` | Internal service key (pre-filled). |
| `FAL_KEY` | API Key for [fal.ai](https://fal.ai/). Create a free account and generate an API key under **Settings → API Keys**. |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID. Create in [Google Cloud Console](https://console.cloud.google.com/apis/credentials). |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret from the same console. |

---

# 🔐 Authentication Setup (Clerk)

This project uses **Clerk** for authentication.  
Follow the steps below to configure Clerk for local development and production.

---

## 1. Create a Clerk Application

1. Visit **https://dashboard.clerk.com/**
2. Click **Create Application**
3. Select **Web** (or the appropriate client type)
4. Go to **Settings → API Keys**
5. Copy the following keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`

---

## 2. Add Environment Variables

Create a `.env` file in the project root:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Optional (recommended)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

___

# ☁️ Cloudflare R2 Setup Guide

This project uses **Cloudflare R2** for storage (images, assets, uploads, etc.).  
Follow the steps below to configure R2 for both local development and production.

---

## 1. Create an R2 Bucket

1. Go to **https://dash.cloudflare.com/**
2. Select your account → open **R2 (Object Storage)**
3. Click **Create Bucket**
4. Give your bucket a name, e.g. `my-app-bucket`
5. After creation, go to the bucket → **Settings** → copy:
   - **Bucket Name**
   - **Public Bucket URL** (if public access is needed)

---

## 2. Create an R2 API Token

1. In Cloudflare dashboard, go to **R2 → Manage R2 API Tokens**
2. Click **Create API Token**
3. Choose **Edit** or **Read & Write** access for your bucket
4. Generate the token
5. Save the following:
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`

⚠️ **These are sensitive secrets — do not commit them to Git!**

---

## 3. Find Your R2 Endpoint

Each bucket gets a unique S3-compatible endpoint.

1. Go to your bucket → **S3 API**
2. Copy the **S3 Endpoint**

## 4. Add Environment Variables

Add these to your `.env` file:

```bash
R2_ACCOUNT_ID=your_r2_account_id
R2_ACCESS_KEY_ID=your_access_key
R2_SECRET_ACCESS_KEY=your_secret_key
R2_BUCKET_NAME=my-app-bucket
```

---

# ▶️ Running the App

```
yarn dev
```
or
```
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🖼️ Tech Stack

- [Next.js](https://nextjs.org/) – React framework for SSR/SSG
- [TypeScript](https://www.typescriptlang.org/) – Strong typing for JavaScript
- [fal.ai](https://fal.ai/) – AI model inference
- [FilePond](https://pqina.nl/filepond/) – File uploads
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS
- [DaisyUI](https://daisyui.com/) – Tailwind component library
- [Clerk](https://clerk.com/) – Authentication and user management
- [Cloudflare R2](https://www.cloudflare.com/en-in/developer-platform/products/r2/) – File Storage

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).  
