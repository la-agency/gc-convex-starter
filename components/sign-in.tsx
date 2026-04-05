"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
	flow: "signIn" | "signUp";
}

export function AuthForm({ flow }: AuthFormProps) {
	const { signIn } = useAuthActions();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const isSignIn = flow === "signIn";

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		setLoading(true);
		const formData = new FormData(event.currentTarget);
		formData.set("flow", flow);
		signIn("password", formData)
			.catch(() => {
				setError(
					isSignIn
						? "Could not sign in. Check your email and password."
						: "Could not sign up. Try a different email or stronger password.",
				);
			})
			.finally(() => setLoading(false));
	}

	return (
		<div className="flex min-h-screen items-center justify-center px-4">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-xl">
						{isSignIn ? "Welcome back" : "Create an account"}
					</CardTitle>
					<CardDescription>
						{isSignIn
							? "Sign in with your email and password"
							: "Enter your details to get started"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="grid gap-4">
						<div className="grid gap-1.5">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="you@example.com"
								autoComplete="email"
								required
							/>
						</div>
						<div className="grid gap-1.5">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="••••••••"
								autoComplete={isSignIn ? "current-password" : "new-password"}
								required
								minLength={8}
							/>
						</div>

						{error && <p className="text-sm text-destructive">{error}</p>}

						<Button type="submit" size="lg" disabled={loading}>
							{loading ? "Loading..." : isSignIn ? "Sign in" : "Sign up"}
						</Button>

						<div className="grid gap-1 text-center text-sm text-muted-foreground">
							<p>
								{isSignIn
									? "Don't have an account?"
									: "Already have an account?"}{" "}
								<Link
									href={isSignIn ? "/signup" : "/signin"}
									className="font-medium text-foreground underline-offset-4 hover:underline"
								>
									{isSignIn ? "Sign up" : "Sign in"}
								</Link>
							</p>
							{isSignIn && (
								<Link
									href="/reset-password"
									className="font-medium text-muted-foreground underline-offset-4 hover:underline"
								>
									Forgot your password?
								</Link>
							)}
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
