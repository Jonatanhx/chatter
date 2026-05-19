import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, type ButtonProps } from "@mantine/core";

type IconButtonProps = ButtonProps & {
  icon: IconDefinition;
  onClick?: (e: React.MouseEvent) => void;
};

export function IconButton({ icon, onClick, ...rest }: IconButtonProps) {
  return (
    <Button
      variant="icon"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      {...rest}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
}
