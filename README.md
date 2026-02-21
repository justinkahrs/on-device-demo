# @justinkahrs/on-device-demo

Reusable React component library for rendering a mock mobile chat UI with scripted message playback.

## Install

```bash
npm install @justinkahrs/on-device-demo
```

`react` and `react-dom` are peer dependencies. Most React app templates already include them.

## Quick start

```tsx
import {
  MockMobileDevice,
  type MockMessageScript,
} from "@justinkahrs/on-device-demo";

const script: MockMessageScript[] = [
  { from: "guest", text: "Hey, can you share check-in details?" },
  { from: "bot", text: "Check-in starts at 3:00 PM." },
];

export function Demo() {
  return <MockMobileDevice script={script} messageDelayMs={1200} />;
}
```

## Script format

```tsx
import type { MockMessageScript } from "@justinkahrs/on-device-demo";

const script: MockMessageScript[] = [
  { from: "guest", text: "Hey, can you share check-in details?" },
  {
    id: "main-choice",
    from: "bot",
    awaitUser: true,
    branches: {
      upgrade: "upgrade-path",
      support: "support-path",
    },
    component: <>Need anything else?</>,
  },
  { id: "upgrade-path", from: "guest", text: "Upgrade my checkout time" },
];
```

- `from`: `"guest" | "bot" | "owner"`
- `text`: plain message content
- `component`: custom React node content
- `awaitUser`: pause playback until `resume()` is called
- `id`: optional message id for pointer targets
- `branches`: map from selected value to the next message id/index
- `next`: explicit next message id/index

`QuickReplies` can pass branch values as strings or `{ label, value }`.

## Public exports

- `MockMobileDevice`
- `useMockMobileChat`
- `ChatProvider`
- `Message`, `TypingIndicator`
- `QuickReplies`
- `Header`
- `PhoneContainer`
- `ChatWindow`
- `AppleButton`
- `CommonButton`
- `GuestName`
- `RichLink`
- Types: `MockMessageScript`, `MockMobileDeviceProps`, `QuickReplyOption`, `HeaderProps`

## Local development

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000` (demo app)
- `http://localhost:3000/library-demo` (library playground)

## Build the library

```bash
npm run build:lib
```

This generates `dist/` (JS + type declarations + CSS module assets).

## Publish to npm

1. Confirm the package name in `/package.json` matches your npm scope.
2. Bump the version: `npm version patch` (or `minor` / `major`).
3. Login once: `npm login`.
4. Publish: `npm publish`.

`prepublishOnly` runs `build:lib` and `npm pack --dry-run`, so publish fails early if packaging is broken.
