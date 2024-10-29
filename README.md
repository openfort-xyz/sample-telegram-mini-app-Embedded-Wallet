# Telegram Mini App Embedded Wallet

This repository contains a sample implementation of a Telegram Mini App that integrates with Openfort to provide smart wallet functionalities. The project is divided into two main components: a Next.js application and a Telegram bot.

## Overview

The Openfort Telegram Mini App allows users to authenticate and generate a smart wallet directly within Telegram. This example demonstrates how to utilize Openfort's custom authentication and smart accounts through a Telegram mini app.

## Project Structure

- **Next.js Application**: Located in the `/next-app` directory, this is the frontend component that handles user interactions and wallet functionalities.
- **Telegram Bot**: Located in the `/telegram-bot` directory, this bot interacts with users on Telegram and directs them to the Next.js application.

## Getting Started

### Prerequisites

- Node.js and npm/yarn
- Telegram account
- Access to the [Openfort dashboard](https://dashboard.openfort.xyz/)

### Setup Instructions

1. **Environment Configuration**:
   - Copy the example environment configuration files:
     ```bash
     cp .env.example .env
     ```
   - Perform this step in both the `/next-app` and `/telegram-bot` directories.

2. **Bot Creation**:
   - Use the BotFather on Telegram to create a new bot.
   - Set the `BOT_TOKEN` in the `.env` files of both the `/next-app` and `/telegram-bot` directories.

3. **Openfort Application Setup**:
   - Create a new application on the Openfort dashboard.
   - Add your Standard and Shield Keys to the `.env` file in the `/next-app` directory.

4. **Asset and Policy Configuration**:
   - Create a new Asset and Policy on the Openfort dashboard.
   - Add their IDs to the `.env` file in the `/next-app` directory.

5. **Endpoint Configuration**:
   - Set up ngrok or a similar service to create a public endpoint.
   - Add this endpoint to the `FRONTEND_APP_ORIGIN` in the `.env` file of the `/telegram-bot` directory.

### Running the Project

1. Install dependencies in both directories:
   ```bash
   yarn install
   ```

2. Start the development servers:
   ```bash
   yarn dev
   ```
   Execute this command in both the `/next-app` and `/telegram-bot` directories.

3. Access the app at `http://localhost:3000`. 
   - Send the `/start` command to your configured Telegram bot.

4. Upon pressing "Launch App," a mini app will open, and a wallet will be generated for the user.

## Features

- **User Authentication**: Authenticate users via Telegram and Openfort.
- **Smart Wallet Generation**: Automatically generate a smart wallet for authenticated users.
- **NFT Minting**: Users can mint NFTs through the application interface.

## API Endpoints

- **`/api/createAuthConfig`**: Configures the project to accept Telegram Mini Apps as an authentication provider.
- **`/api/createEncryptionSession`**: Establishes a new encryption session for the user.
- **`/api/mintNft`**: Mints a new NFT for the authenticated user.

## Deployment

- **Next.js**: Can be deployed on platforms like Vercel.
- **Telegram Bot**: Can be deployed using Docker or Vercel.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
