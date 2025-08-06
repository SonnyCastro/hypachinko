This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, create a `.env.local` file in the root directory with the following variables:

```bash
# WalletConnect Project ID (required)
NEXT_PUBLIC_PROJECT_ID=your_walletconnect_project_id_here

# Contract addresses
NEXT_PUBLIC_LOTTERY_POT_ADDRESS=0x...
NEXT_PUBLIC_PAYMENT_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_PBALLS_TOKEN_ADDRESS=0x...

# Custom RPC URL (optional - will use default if not provided)
# Replace with your custom HyperEVM RPC endpoint to avoid rate limiting
NEXT_PUBLIC_RPC_URL=https://your-custom-rpc-endpoint.com

# Feature flags
NEXT_PUBLIC_ENABLE_TESTNETS=false
```

Then, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Configuration

### Custom RPC URL

To avoid rate limiting issues with the default HyperEVM RPC endpoint, you can configure a custom RPC URL by setting the `NEXT_PUBLIC_RPC_URL` environment variable. This will be used for all blockchain interactions.

### Infinite Loop Fixes

The application has been optimized to prevent infinite loops by:

- Using `useRef` to avoid circular dependencies in `useCallback` hooks
- Increasing API call intervals to reduce rate limiting (60s for lottery data, 120s for user data)
- Proper dependency management in React hooks

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
