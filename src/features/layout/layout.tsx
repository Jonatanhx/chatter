import { AppShell, ScrollArea } from "@mantine/core";
import Image from "next/image";
import type React from "react";
import { SignInForm } from "../../components/signInForm";

export function Layout({ children }: { children: React.ReactNode }) {
  const isAuthed = true;

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
        <AppShell.Section grow component={ScrollArea}>
          Navbar main section that will expand to fill available space
        </AppShell.Section>
        <AppShell.Section>
          Navbar footer – always at the bottom
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Aside>hej</AppShell.Aside>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
function UnauthedLayout() {
  return (
    <main>
      <SignInForm />
    </main>
  );
}
