import type { NextConfig } from "next";
import 'dotenv/config'

const nextConfig: NextConfig = {
  /* config options here */
};

export const API_CONNECTION_STRING = process.env.NEXT_PUBLIC_API_CONNECTION_STRING;

export default nextConfig;
