"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const STREAMING_AI_PROMPT = `Add streaming AI output to this app using the Vercel AI SDK and OpenAI.

## Setup

- Install the Vercel AI SDK: ai, @ai-sdk/openai
- Add OPENAI_API_KEY to the environment variables
- Use the Vercel AI SDK's streamText function for streaming responses

## Behavior

- There should be a way for users to trigger an AI-generated response
  relevant to what they are working on (e.g. a "Generate" or "Summarize"
  button, or an input field with a submit action).
- When the user triggers it, the response should stream in token by token
  so the user sees output appearing in real time rather than waiting for
  the full response.
- While streaming, show a subtle loading indicator and disable the trigger
  so the user cannot send another request until the current one finishes.
- If an error occurs, display a clear message to the user.

## Implementation

- Create a Next.js Route Handler (app/api/ai/route.ts) that uses the
  Vercel AI SDK's streamText with the OpenAI provider.
- On the frontend, use the Vercel AI SDK's useCompletion hook to handle
  the streaming response and display it.
- The streamed output should render with good typography and formatting.`;

const CHAT_PROMPT = `Add a chat interface to this app using the Vercel AI SDK and OpenAI.

## Setup

- Install the Vercel AI SDK: ai, @ai-sdk/openai
- Add OPENAI_API_KEY to the environment variables
- Use the Vercel AI SDK for both the backend route and the frontend hook

## Behavior

- Add a chat page accessible from the sidebar.
- The chat should have a message list and an input field at the bottom.
- The user types a message and presses Enter or clicks Send.
- The AI response streams in token by token in a separate message bubble
  so the user sees output appearing in real time.
- The conversation history is maintained for the duration of the session
  so the AI has context from previous messages.
- While the AI is responding, the input should be disabled and a subtle
  loading indicator should show on the AI's message bubble.
- Messages from the user should be visually distinct from AI responses
  (e.g. aligned to the right vs left, or different background colors).
- The message list should auto-scroll to the bottom as new content streams in.

## Implementation

- Create a Next.js Route Handler (app/api/chat/route.ts) that uses the
  Vercel AI SDK's streamText with the OpenAI provider, accepting the
  message history in the request body.
- On the frontend, use the Vercel AI SDK's useChat hook which handles
  message state, streaming, and the request lifecycle automatically.
- The chat input should support Enter to send and Shift+Enter for newlines.`;

const KIDS_APP_PROMPT = `Turn this into a kids app for families.

It should feel fun, bright, and playful — something a 7 year old would
love to use. Big buttons, rounded corners, colorful, friendly fonts.
Retheme the whole app to match.

When someone signs up, they create a family. Parents can add kids as
family members. Kids get a simpler view with bigger UI. The sidebar
shows the family name and members.`;

const WORKSPACE_PROMPT = `Add workspaces and team members to this app.

## Workspaces

- When a user signs up and logs in for the first time, they should be
  prompted to create a workspace. They provide a workspace name.
- Creating a workspace makes that user an admin of the workspace.
- A user can belong to multiple workspaces.
- After creating or selecting a workspace, the user enters the dashboard
  scoped to that workspace.
- The sidebar should show the current workspace name and allow switching
  between workspaces.

## Team Members

- A workspace admin can invite team members by email address.
- An invitation is sent via email using Resend.
- When an invited user signs up, instead of being prompted to create a
  workspace, they should first see their pending invitations.
- They can accept an invitation to join an existing workspace, or skip
  and create their own workspace instead.
- Each team member has a role: "admin" or "member".
- Admins can invite and remove members. Members cannot.

## UX Flow

1. Sign up / sign in
2. If pending invitations exist -> show invitation list (accept / decline)
3. If no workspace -> prompt to create one
4. If one workspace -> go straight to dashboard
5. If multiple workspaces -> go to most recently used workspace
6. Dashboard is scoped to the selected workspace`;

interface SetupStep {
  label: string;
  command?: string;
  href?: string;
  linkText?: string;
}

function CopyablePrompt({
  title,
  description,
  setup,
  prompt,
}: {
  title: string;
  description: string;
  setup?: SetupStep[];
  prompt: string;
}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="shrink-0"
          >
            {copied ? (
              <>
                <Check className="size-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                Copy
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {setup && setup.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium">Before you start</p>
            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
              {setup.map((step) => (
                <li key={step.label}>
                  {step.label}
                  {step.href && (
                    <>
                      {" "}
                      <a
                        href={step.href}
                        className="font-medium text-foreground underline-offset-4 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {step.linkText ?? step.href}
                      </a>
                    </>
                  )}
                  {step.command && (
                    <code className="ml-1.5 rounded bg-muted px-1.5 py-0.5 text-xs">
                      {step.command}
                    </code>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
        <pre className="max-h-96 overflow-auto rounded-lg bg-muted p-4 text-sm leading-relaxed whitespace-pre-wrap">
          {prompt}
        </pre>
      </CardContent>
    </Card>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          About this project
        </h1>
        <div className="space-y-3 text-muted-foreground">
          <p>
            This is a starter with everything you need to ship something.
            Authentication (email/password, password reset), a dashboard shell,
            and transactional email are already wired up — just start building.
          </p>
          <p>
            The backend is powered by{" "}
            <a
              href="https://convex.dev"
              className="font-medium text-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Convex
            </a>{" "}
            — a real-time database and backend you can control entirely by
            describing what you want to your AI assistant. The frontend uses{" "}
            <a
              href="https://nextjs.org"
              className="font-medium text-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href="https://ui.shadcn.com"
              className="font-medium text-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              shadcn/ui
            </a>
            .
          </p>
          <p>
            Everything is flexible — you can prompt any layout, experience, or
            feature set that you want. This is just a good starting point. Below
            are some common features with ready-to-use prompts to get you going.
          </p>
        </div>
      </div>

      <CopyablePrompt
        title="Streaming AI Output"
        description="Add AI-generated content that streams in real time using the Vercel AI SDK and OpenAI."
        setup={[
          {
            label: "Get an OpenAI API key from",
            href: "https://platform.openai.com/api-keys",
            linkText: "platform.openai.com",
          },
          {
            label: "Add it to your Convex environment:",
            command: "npx convex env set OPENAI_API_KEY <your-key>",
          },
        ]}
        prompt={STREAMING_AI_PROMPT}
      />

      <CopyablePrompt
        title="Chat Interface"
        description="A conversational chat UI with streaming AI responses, message history, and auto-scroll."
        setup={[
          {
            label: "Get an OpenAI API key from",
            href: "https://platform.openai.com/api-keys",
            linkText: "platform.openai.com",
          },
          {
            label: "Add it to your Convex environment:",
            command: "npx convex env set OPENAI_API_KEY <your-key>",
          },
        ]}
        prompt={CHAT_PROMPT}
      />

      <CopyablePrompt
        title="Workspaces & Team Members"
        description="Multi-tenant workspaces where users can create teams and invite members by email."
        prompt={WORKSPACE_PROMPT}
      />

      <CopyablePrompt
        title="Kids App with Families"
        description="An example of how easily you can retheme the app and rethink the UX for a different audience."
        prompt={KIDS_APP_PROMPT}
      />
    </div>
  );
}
