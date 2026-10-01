# 🎁 Secret Santa

Organize a Secret Santa in about a minute, in person. Name the group, add everyone one by one, set the budget, reveal day and place, and draw. Then pass the phone around: everyone taps their own name, confirms it's them and holds a button to see who they got. Nobody can see someone else's result by accident, and when everyone has peeked the app tells you how many days are left until reveal day.

No sign-up and no server. The group is saved on the organizer's device. The interface is in Portuguese, with an English toggle.

> **Live:** **[secret-santa.chapelin.com.br](https://secret-santa.chapelin.com.br/)**

## Stack

Next.js 15 (static export), React 19, TypeScript, GSAP and CSS Modules. The visual identity matches [chapelin.com.br](https://chapelin.com.br).

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # unit tests (draw, calendar, participants)
npm run build      # static export in out/
```

## How it works

- **Fair draw**: names are shuffled with `crypto.getRandomValues` and linked in one single chain, so nobody draws themselves and everyone is connected.
- **Redo**: drawing again gives everyone a new person; whoever already peeked needs to look again.

Made by [Pedro Chapelin](https://chapelin.com.br).
