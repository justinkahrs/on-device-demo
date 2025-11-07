# Amastay On-Device Demo

This repo contains a small Next.js 15 app that simulates an on-device RCS conversation between an Amastay guest, a concierge bot, and a property host. It is meant to showcase how interactive messaging (quick replies, rich cards, Apple Pay/Wallet actions, etc.) can guide a traveler through check-in, recommendations, upsells, and live support without needing a native client.

## Experience highlights
- **Scripted RCS flow** – `src/app/messages.tsx` stitches together the guest journey (welcome, directions, house rules, local tips, upsells, and owner escalation) using text bubbles or custom React components.
- **Guided interactions** – Quick replies, typing indicators, and a “tap to continue” nudge keep the story flowing while still letting the user take action when a bot awaits input.
- **Rich cards & deep links** – `RichLink` components open Apple Maps, calendar intents (`ical://`), or the in-app `/house-rules` page that renders `public/HouseRules.md` with Markdown.
- **Apple Pay / Wallet simulation** – The `AppleButton` component opens a bottom sheet via a portal anchored to the phone chrome, then resumes the chat once payment/access is confirmed.
- **Phone shell** – `PhoneContainer` + `Header` mimic a verified business chat UI and expose restart/back affordances so the demo feels native on desktop.

## Tech stack
- Next.js 15 App Router + React 19 with TypeScript
- CSS Modules for scoped styling and a global shell in `src/app/globals.css`
- Framer Motion for tactile button ripples
- MUI Icons for chat affordances
- React Markdown to hydrate the standalone house rules page

## Getting started
1. **Prerequisites** – Node.js ≥ 18 and npm.
2. **Install** – `npm install`
3. **Run locally** – `npm run dev` and open `http://localhost:3000`
4. **Production build** – `npm run build && npm run start`

### Available scripts
- `npm run dev` – Start the Next.js dev server with hot reload.
- `npm run build` – Create an optimized production build.
- `npm run start` – Serve the production build.
- `npm run lint` – Run the Next.js/ESLint rules configured in `eslint.config.mjs`.

## Project layout
```
src/
  app/                # App Router pages, global styles, demo metadata
  components/         # Reusable UI (chat window, buttons, rich cards, etc.)
  context/            # ChatProvider + state machine for the scripted flow
  hooks/              # Shared hooks (e.g., delayed “continue” prompt)
public/               # Images + HouseRules.md rendered by /house-rules
```

## Customizing the demo
- **Conversation copy** – Edit or append scenarios inside `src/app/messages.tsx`. Each message can render plain text or a rich React component, and `awaitUser` pauses the autoplay until `resume()` is called.
- **Guest & property info** – Update `src/components/GuestName/GuestName.tsx` and any hard-coded metadata (dates, address, assets) in the message components.
- **House rules** – Replace `public/HouseRules.md` with your content; the `/house-rules` route fetches it on mount and renders Markdown.
- **Assets & branding** – Drop new imagery into `public/` and update references in `messages.tsx`, `Header`, or CSS modules.
- **Timing & flow control** – Tweak `MESSAGE_DELAY_TIME` and resume logic inside `src/context/ChatContext.tsx` to change pacing, typing indicators, or when the experience restarts.
- **Styling** – Modify the CSS modules within each component or adjust the shell in `src/app/styles.module.css` / `globals.css`.

## Deployment
The app is optimized for platforms that support a Next.js server (Vercel, Netlify, Render, etc.). Run `npm run build` during CI/CD and point your host to `npm run start`. Because the demo relies only on static assets and client-side scripts, it also works when exported to an edge runtime or embedded within a marketing site via an iframe.
