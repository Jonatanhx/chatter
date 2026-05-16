import {
  faArrowRightFromBracket,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppShell, Avatar, Button, Menu, ScrollArea } from "@mantine/core";
import Image from "next/image";
import type React from "react";
import { api } from "~/utils/api";
import type { User } from "../../../generated/prisma";
import { SignInForm } from "../../components/signInForm";
import classes from "./layout.module.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = api.auth.getSession.useQuery();
  const isAuthed = !!session;

  return isAuthed ? (
    <AuthedLayout session={session}>{children}</AuthedLayout>
  ) : (
    <UnauthedLayout />
  );
}
function AuthedLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: User;
}) {
  const utils = api.useUtils();
  const { mutate: signOut } = api.auth.signOut.useMutation({
    onSuccess: () => void utils.auth.getSession.reset(),
  });

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 0 }}
      aside={{ width: 400, breakpoint: 0 }}
    >
      <AppShell.Header classNames={{ header: classes.header }}>
        <Image
          alt="Chatter logo"
          width={45}
          height={45}
          src={"./ChatterLogo.svg"}
        />
        <div className={classes.profileCard}>
          <Menu>
            <Menu.Target>
              <Button className={classes.profileCardMenuButton}>
                <FontAwesomeIcon icon={faEllipsis} color="white" size="lg" />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={() => signOut()}
                leftSection={
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    color="white"
                    size="lg"
                  />
                }
              >
                Sign out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          {session.name ? session.name : session.email}
          <Avatar
            bd={"1px solid gray"}
            src={session.image}
            alt={`${session.name}'s profile picture`}
          />
        </div>
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
