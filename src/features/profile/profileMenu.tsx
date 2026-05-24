import {
  faArrowRightFromBracket,
  faCog,
  faEllipsis,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Menu } from "@mantine/core";
import { IconButton } from "~/components/iconButton";
import { api } from "~/utils/api";
import classes from "./profileMenu.module.css";

export function ProfileMenu() {
  const { data: session } = api.auth.getSession.useQuery();

  const utils = api.useUtils();
  const { mutate: signOut } = api.auth.signOut.useMutation({
    onSuccess: () => void utils.auth.getSession.reset(),
  });

  if (!session) return null;

  return (
    <div className={classes.profileCard}>
      <Avatar
        bd={"1px solid gray"}
        src={session.image}
        alt={`${session.name}'s profile picture`}
      />

      {session.name ? session.name : session.email}
      <Menu>
        <Menu.Dropdown>
          <Menu.Item leftSection={<FontAwesomeIcon icon={faUser} />}>
            Profile
          </Menu.Item>
          <Menu.Item leftSection={<FontAwesomeIcon icon={faCog} />}>
            Settings
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={() => signOut()}
            leftSection={<FontAwesomeIcon icon={faArrowRightFromBracket} />}
          >
            Sign out
          </Menu.Item>
        </Menu.Dropdown>
        <Menu.Target>
          <IconButton icon={faEllipsis} />
        </Menu.Target>
      </Menu>
    </div>
  );
}
