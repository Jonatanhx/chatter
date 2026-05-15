import { AppShell, ScrollArea } from "@mantine/core";
import Image from "next/image";
import type React from "react";
import { api } from "~/utils/api";
import { SignInForm } from "../../components/signInForm";
import classes from "./layout.module.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = api.auth.getSession.useQuery();
  const isAuthed = !!session;

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
      navbar={{ width: 300, breakpoint: 0 }}
      aside={{ width: 400, breakpoint: 0 }}
    >
      <AppShell.Header>
        <Image
          alt="Chatter logo"
          width={45}
          height={45}
          src={"./ChatterLogo.svg"}
        ></Image>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section grow component={ScrollArea} p={20}>
          Navbar main section that will expand to fill available space
        </AppShell.Section>
        <AppShell.Section>
          Navbar footer – always at the bottom
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Aside p={20}>hej</AppShell.Aside>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
function UnauthedLayout() {
  return (
    <main className={classes.unauthedLayout}>
      <SignInForm />
    </main>
  );
}
