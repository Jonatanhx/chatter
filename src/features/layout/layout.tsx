import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppShell, Button, Group, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import { api } from "~/utils/api";
import { RegisterForm, SignInForm } from "../auth/authForms";
import { Aside } from "./aside";
import { Header } from "./header";
import classes from "./layout.module.css";
import { Navbar } from "./navbar";

export function Layout({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = api.auth.getSession.useQuery();
  const isAuthed = !!session;

  if (isLoading) return null;

  return isAuthed ? (
    <AuthedLayout>{children}</AuthedLayout>
  ) : (
    <UnauthedLayout />
  );
}
function AuthedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      layout="alt"
      header={{ height: 75 }}
      navbar={{ width: 400, breakpoint: "sm", collapsed: { mobile: true } }}
      aside={{ width: 400, breakpoint: "sm", collapsed: { mobile: true } }}
    >
      <Header />
      <Navbar />
      <AppShell.Main>{children}</AppShell.Main>
      <Aside />
    </AppShell>
  );
}
function UnauthedLayout() {
  const [activeView, setActiveView] = useState<"START" | "SIGNIN" | "REGISTER">(
    "START",
  );
  return (
    <main className={classes.unauthedLayout}>
      {activeView === "START" && (
        <Stack gap="3xl">
          <Stack align="center" gap="xl">
            <Image
              src="/ChatterLogo.svg"
              alt="Chatter logo"
              width={100}
              height={100}
            />
            <Stack gap="xs" align="center">
              <Title order={1} c="white">
                Welcome to Chatter
              </Title>
              <Text size="md" c="neutral.3">
                See what all the talk is about.
              </Text>
            </Stack>
          </Stack>
          <Stack>
            <Button
              bdrs="xl"
              color="brand.4"
              size="md"
              w="100%"
              onClick={() => setActiveView("SIGNIN")}
            >
              Sign in
            </Button>
            <Button
              bdrs="xl"
              size="md"
              onClick={() => setActiveView("REGISTER")}
            >
              Register
            </Button>
          </Stack>
        </Stack>
      )}

      {activeView === "SIGNIN" && (
        <Stack gap="lg">
          <Group gap="sm">
            <Button variant="icon" onClick={() => setActiveView("START")}>
              <FontAwesomeIcon size="lg" icon={faArrowLeft} />
            </Button>
            <Title order={2}>Sign in</Title>
          </Group>
          <SignInForm />
        </Stack>
      )}
      {activeView === "REGISTER" && (
        <Stack gap="lg">
          <Group gap="sm">
            <Button variant="icon" onClick={() => setActiveView("START")}>
              <FontAwesomeIcon size="lg" icon={faArrowLeft} />
            </Button>
            <Title order={2}>Register</Title>
          </Group>
          <RegisterForm />
        </Stack>
      )}
    </main>
  );
}
