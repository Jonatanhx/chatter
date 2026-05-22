import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AppShell,
  Button,
  Group,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Image from "next/image";
import type React from "react";
import { useState } from "react";
import { api } from "~/utils/api";
import { RegisterForm, SignInForm } from "../auth/authForms";
import { Header } from "./header";
import classes from "./layout.module.css";

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
      header={{ height: 60 }}
      navbar={{ width: 400, breakpoint: "sm", collapsed: { mobile: true } }}
      aside={{ width: 400, breakpoint: "sm", collapsed: { mobile: true } }}
    >
      <Header />
      <AppShell.Navbar>
        <AppShell.Section grow component={ScrollArea} p={20}>
          hej2
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Aside p={20}>hej</AppShell.Aside>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
function UnauthedLayout() {
  const [activeView, setActiveView] = useState<"START" | "SIGNIN" | "REGISTER">(
    "START",
  );
  return (
    <Stack className={classes.unauthedLayout} gap="3xl">
      {activeView === "START" && (
        <>
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
              w={"100%"}
              onClick={() => setActiveView("SIGNIN")}
            >
              Sign in
            </Button>
            <Button
              bdrs="xl"
              w={"100%"}
              onClick={() => setActiveView("REGISTER")}
            >
              Register
            </Button>
          </Stack>
        </>
      )}
      {activeView === "SIGNIN" && (
        <Stack>
          <Group gap={0}>
            <Button
              variant="icon"
              onClick={() => setActiveView("START")}
              leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
            />
            <Text size="lg" fw={"500"}>
              Sign in
            </Text>
          </Group>
          <SignInForm />
        </Stack>
      )}
      {activeView === "REGISTER" && (
        <Stack>
          <Group gap={0}>
            <Button
              variant="icon"
              onClick={() => setActiveView("START")}
              leftSection={<FontAwesomeIcon icon={faArrowLeft} />}
            />
            <Text size="lg" fw={"500"}>
              Register
            </Text>
          </Group>
          <RegisterForm />
        </Stack>
      )}
    </Stack>
  );
}
