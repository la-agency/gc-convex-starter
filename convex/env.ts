function required(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing required Convex environment variable: ${name}`);
	}
	return value;
}

function optional(name: string): string | undefined {
	return process.env[name] || undefined;
}

/**
 * Typed access to Convex server environment variables.
 *
 * Required vars throw on access if missing.
 * Optional vars return undefined — validate at the point of use.
 */
export const convexEnv = {
	get CONVEX_SITE_URL() {
		return required("CONVEX_SITE_URL");
	},

	/** Set with: npx convex env set RESEND_API_KEY re_xxxxxxxxxx */
	get RESEND_API_KEY() {
		return optional("RESEND_API_KEY");
	},

	/** Set with: npx convex env set FROM_EMAIL "App Name <you@yourdomain.com>" */
	get FROM_EMAIL() {
		return optional("FROM_EMAIL");
	},
};
