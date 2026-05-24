import { AppShell, Group } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import classes from "./header.module.css";
export function Header() {
  return (
    <AppShell.Header classNames={{ header: classes.header }}>
      <Group p="md">
        <Link href="/">
          <Image
            src="/ChatterLogo.svg"
            alt="Chatter logo"
            width={45}
            height={45}
          />
        </Link>
      </Group>
    </AppShell.Header>
  );
}
