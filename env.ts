import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	client: {
		NEXT_PUBLIC_CONVEX_URL: z
			.string()
			.url("Run `npx convex dev` to set up your Convex project"),
		NEXT_PUBLIC_CONVEX_SITE_URL: z
			.string()
			.url("Run `npx convex dev` to set up your Convex project"),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
		NEXT_PUBLIC_CONVEX_SITE_URL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
	},
});
