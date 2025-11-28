import { handleAuth } from "@auth0/nextjs-auth0";

// Create the handler once
const authHandler = handleAuth();

// Wrap the GET handler to wait for params
export const GET = async (req, props) => {
  const params = await props.params; // 1. Await the params (Next.js 16 requirement)
  return authHandler(req, { params }); // 2. Pass the unwrapped params to Auth0
};

// Wrap the POST handler as well
export const POST = async (req, props) => {
  const params = await props.params;
  return authHandler(req, { params });
};