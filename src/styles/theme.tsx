import { Button, createTheme, type MantineColorsTuple } from "@mantine/core";
import classes from "./theme.module.css";

const brandColor: MantineColorsTuple = [
  "#eef3ff",
  "#dce4f5",
  "#b9c7e2",
  "#94a8d0",
  "#748dc1",
  "#5f7cb8",
  "#5474b4",
  "#44639f",
  "#39588f",
  "#2d4b81",
];

export const theme = createTheme({
  primaryColor: "brand",
  colors: {
    brand: brandColor,
  },
  fontFamily: "Inter, sans-serif",
  defaultRadius: "md",
  black: "#141414",
  white: "#e8e8e8",
  components: {
    Button: Button.extend({
      classNames: (_, props) => {
        if (props.variant === "icon") return { root: classes.iconButton };
        if (props.variant === "iconTransparent")
          return { root: classes.iconButtonTransparent };
        return {};
      },
    }),
  },
});
