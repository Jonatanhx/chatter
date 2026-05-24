import { AppShell } from "@mantine/core";
import { ProfileMenu } from "../profile/profileMenu";

export function Aside() {
  return (
    <AppShell.Aside p={20}>
      <ProfileMenu />
    </AppShell.Aside>
  );
}
