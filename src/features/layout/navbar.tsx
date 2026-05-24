import {
  faChevronRight,
  faCog,
  faHome,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppShell, Group, NavLink, Stack } from "@mantine/core";

export function Navbar() {
  return (
    <AppShell.Navbar>
      <Group>
        <Stack flex={1} />
        <Stack w="fit-content" p="xl">
          <NavLink
            href="/"
            label="Home"
            leftSection={<FontAwesomeIcon icon={faHome} size="lg" />}
            rightSection={<FontAwesomeIcon icon={faChevronRight} />}
          />
          <NavLink
            label="Explore"
            leftSection={<FontAwesomeIcon icon={faSearch} size="lg" />}
            rightSection={<FontAwesomeIcon icon={faChevronRight} />}
          />
          <NavLink
            label="Profile"
            leftSection={<FontAwesomeIcon icon={faUser} size="lg" />}
            rightSection={<FontAwesomeIcon icon={faChevronRight} />}
          />
          <NavLink
            label="Settings"
            leftSection={<FontAwesomeIcon icon={faCog} size="lg" />}
            rightSection={<FontAwesomeIcon icon={faChevronRight} />}
          />
        </Stack>
      </Group>
    </AppShell.Navbar>
  );
}
