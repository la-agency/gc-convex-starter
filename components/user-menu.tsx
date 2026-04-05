"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

export function UserMenu() {
	const { signOut } = useAuthActions();

	return (
		<Button variant="outline" size="lg" onClick={() => void signOut()}>
			Sign out
		</Button>
	);
}
