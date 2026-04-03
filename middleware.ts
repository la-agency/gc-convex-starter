import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isAuthRoute = createRouteMatcher([
  "/signin",
  "/signup",
  "/reset-password",
]);

const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;

export default convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    const authenticated = await convexAuth.isAuthenticated();
    if (isProtectedRoute(request) && !authenticated) {
      return nextjsMiddlewareRedirect(request, "/signin");
    }
    if (isAuthRoute(request) && authenticated) {
      return nextjsMiddlewareRedirect(request, "/dashboard");
    }
  },
  {
    cookieConfig: {
      maxAge: THIRTY_DAYS_IN_SECONDS,
    },
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
