import {
  faArrowRightFromBracket,
  faCog,
  faEllipsis,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppShell, Avatar, Button, Menu } from "@mantine/core";
import Image from "next/image";
import { api } from "~/utils/api";
import classes from "./header.module.css";
export function Header() {
  const { data: session } = api.auth.getSession.useQuery();

  const utils = api.useUtils();
  const { mutate: signOut } = api.auth.signOut.useMutation({
    onSuccess: () => void utils.auth.getSession.reset(),
  });

  if (!session) return null;

  return (
    <AppShell.Header classNames={{ header: classes.header }}>
      <Image
        alt="Chatter logo"
        width={45}
        height={45}
        src={"./ChatterLogo.svg"}
      />
      <div className={classes.profileCard}>
        <Avatar
          bd={"1px solid gray"}
          src={session.image}
          alt={`${session.name}'s profile picture`}
        />

        {session.name ? session.name : session.email}
        <Menu>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<FontAwesomeIcon icon={faUser} color="white" />}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              leftSection={<FontAwesomeIcon icon={faCog} color="white" />}
            >
              Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              onClick={() => signOut()}
              leftSection={
                <FontAwesomeIcon icon={faArrowRightFromBracket} color="white" />
              }
            >
              Sign out
            </Menu.Item>
          </Menu.Dropdown>
          <Menu.Target>
            <Button variant="icon">
              <FontAwesomeIcon icon={faEllipsis} color="white" />
            </Button>
          </Menu.Target>
        </Menu>
      </div>
    </AppShell.Header>
  );
}
