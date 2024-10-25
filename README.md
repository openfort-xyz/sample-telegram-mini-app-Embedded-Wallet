# Openfort Telegram Mini App Example

Authenticate your users and generate a smart wallet without ever leaving Telegram. This example app showcases Openfort's custom authentication and smart accounts from within a Telegram mini app.

## Getting Started

## Setup
1. Create your `.env` by running `cp .env.example .env` in both the `/next-app` and `/telegram-bot` directories.
2. Create a new bot using the Bot father and set the `BOT_TOKEN` in both the `/next-app` and `/telegram-bot` directories.
3. Create a new app from the [openfort dashboard]https://dashboard.openfort.xyz/ and add your Standard and Shield Keys to your `.env` on the `/next-app` directory.
4. Create a new Asset and Policy from the [openfort dashboard]https://dashboard.openfort.xyz/ and add their ID's to your `.env` on the `/next-app` directory.
5. Setup your ngrok or similar endpoint and add it to the `FRONTEND_APP_ORIGIN` to your `.env` on the `/telegram-bot` directory.

### Run the project
Run the `yarn install` command in both the `/next-app` and `/telegram-bot` directories.
Now, run `yarn dev` in both the `/next-app` and `/telegram-bot` directories. This will start the Next.js app and the Telegram bot.

You should see the app at http://localhost:3000. Try messaging the `/start` command to the bot you configured with the Bot Father in Telegram.

When you press "Launch App", your mini app should open and a wallet should be generated for you.

## Telegram-bot
All bot logic is in `/telegram-bot/src/bot/features/openfort.ts`. This is where the bot listens for messages and will open a WebApp with `{FRONTEND_APP_ORIGIN}/login/telegram` (the Next.js app) when the `/start` command is sent.

## Next-app

Telegram bot will open the Next.js app when the `/start` command is sent on the `/login/telegram` route. In this page, Openfort client will be initialized and the user will be automatically authenticated with the Telegram account. The user will be able to mint an NFT.

### API Routes
- `/api/createAuthConfig` - This route is used to configure your project in Openfort so it accepts Telegram Mini Apps as an authentication provider.
- `/api/createEncryptionSession` - This route is used to create a new encryption session for the user, for the non-custodial wallet
- `/api/mintNft` - This route will mint a new NFT for the user.


