# 🖼️ ImageGen - AI Image Generator

An AI-powered image generator built with [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and [fal.ai](https://fal.ai/) models.  
This project allows users to create AI images, upload files seamlessly with [FilePond](https://pqina.nl/filepond/) and [Supabase](https://supabase.com/), and enjoy a clean interface styled using [TailwindCSS](https://tailwindcss.com/) and [DaisyUI](https://daisyui.com/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/7ba5c558-ae1b-4d16-8265-98786ab12d71/deploy-status)](https://app.netlify.com/projects/splendid-paprenjak-e8601a/deploys)

---

## 🚀 Features

- ⚡ AI image generation using [fal.ai](https://fal.ai/)  
- 📂 Image uploads with [FilePond](https://pqina.nl/filepond/) + [Supabase](https://supabase.com/)  
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

## ▶️ Running the App

Start the development server:

```bash
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🖼️ Tech Stack

- [Next.js](https://nextjs.org/) – React framework for SSR/SSG  
- [TypeScript](https://www.typescriptlang.org/) – Strong typing for JavaScript  
- [fal.ai](https://fal.ai/) – AI model inference  
- [FilePond](https://pqina.nl/filepond/) – File uploads  
- [Supabase](https://supabase.com/) – Backend & storage  
- [TailwindCSS](https://tailwindcss.com/) – Utility-first CSS  
- [DaisyUI](https://daisyui.com/) – Tailwind component library  
- [Clerk](https://clerk.com/) – Authentication and user management  

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).  
