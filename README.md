# Todo App Blockchain Project

This project implements a Todo list application using blockchain technology with Ethereum, integrating Solidity smart contracts with a frontend built using Next.js and Chakra UI. Development and testing are conducted locally using Ganache as the personal blockchain (Free of Cost) .

## Technologies Used

- **Frontend**:
  - **Next.js**: React framework for server-rendered React applications.
  - **Chakra UI**: Component library for React applications with customizable design tokens.
  - **Framer Motion**: Extensive animation library for React applications.

- **Blockchain Integration**:
  - **Solidity**: Smart contract language for Ethereum.
  - **Truffle**: Development framework for Ethereum smart contracts.
  - **Ganache**: Personal blockchain for Ethereum development.
  - **Web3.js**: JavaScript library for interacting with the Ethereum blockchain.

## Features

- **Add Task**: Users can add new tasks to their Todo list.
- **Toggle Completion**: Tasks can be marked as completed or incomplete.
- **Blockchain Backend**: Tasks are stored on the blockchain using Ethereum smart contracts.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jubinjacob03/solidity-todo_Dapp-ganache-ts
   cd solidity-todo_Dapp-ganache-ts
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Install and Start Ganache for local blockchain development.
---
>[!IMPORTANT]
>When configuring **Ganache**, ensure it is running on port **7545**, which is the default RPC port used in the `truffle-config.js`. If you intend to use a different custom port, update the `truffle-config.js` accordingly to reflect the custom port ID.
---
4. Compile and migrate smart contracts to serve under Ganache:
   ```bash
   truffle compile
   truffle migrate --reset --network ganache
   ```
5. Start the Next.js server on localhost
   ```bash
   npm run dev
   ```

## Usage
 - Add new tasks by typing in the input field and clicking the <em><strong>ADD</strong></em> button.
 - Click <em><strong>DONE</strong></em> or <em><strong>UNDO</strong></em> to toggle task completion status.
 - Ensure <em><strong>MetaMask (or other Ethereum wallet)</strong></em> is connected to interact with the blockchain features.

## Setting Up MetaMask for Ganache

1. Open MetaMask and click on the network dropdown (it usually shows "Main Ethereum Network").
2. Click on "Custom RPC" to add a new network.
3. Enter the following details:
   - Network Name: Ganache
   - New RPC URL: http://127.0.0.1:7545
   - Chain ID: (leave blank or as default)
   - Symbol: ETH (or any preferred symbol)
   - Block Explorer URL: (leave blank or as default)
4. Click "Save" to add Ganache as a custom network.
5. MetaMask should now be connected to your local Ganache blockchain at `http://127.0.0.1:7545`.

https://github.com/user-attachments/assets/f62d4c2c-cf97-4cad-a896-ccdc42bf5faf

## Project Structure
- **/contracts**: Contains Solidity smart contracts.
- **/src**: Frontend source code using Next.js and Chakra UI.
- **truffle-config.js**: Truffle configuration file for Ethereum network setup.

---

# NextJS Doc

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
