# Handbrake Bitrate Calculator 🧮

A specialized tool for video editors designed to calculate the exact video bitrate required to meet strict file size limits.

## 🚀 Features

- **Precise Calculation:** Determines the exact video bitrate based on duration and target file size (MB/GB).
- **Audio Overhead:** Automatically accounts for audio track size in the calculation.
- **Safety Margin:** Optional -30MB buffer to ensure the file never exceeds the limit (perfect for rigid upload portals like Canva).
- **4K Warning:** Detects and warns if the bitrate is too low for UHD quality to prevent pixelation.
- **PWA Support:** Installable on mobile (iOS/Android) and desktop as a standalone app.
- **Privacy First:** 100% Client-side. No data is sent to any server.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Deploy:** Vercel

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📱 Installation (PWA)

This application is a Progressive Web App.

- **On Mobile:** Tap "Share" > "Add to Home Screen".
- **On Desktop:** Click the install icon in the browser address bar.

## 📝 Usage Guide

- **Duration:** Enter the exact length of your video (Hours/Minutes/Seconds).
- **Target:** Set your file size limit (e.g., 1 GB).
- **Format:** Select your resolution (FHD or 4K) and Audio quality.
- **Calculate:** The "Average Bitrate" updates instantly.
- **Encode:** Use this value in Handbrake (Video Tab > Avg Bitrate > 2-pass encoding).
