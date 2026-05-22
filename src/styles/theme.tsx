import {
  Button,
  createTheme,
  defaultVariantColorsResolver,
  Modal,
  parseThemeColor,
  type MantineColorsTuple,
  type VariantColorsResolver,
} from "@mantine/core";
import classes from "./theme.module.css";

const brandColor: MantineColorsTuple = [
  "#f6eeff",
  "#e7d9f7",
  "#cab1ea",
  "#ad86dd",
  "#9462d2",
  "#854bcb",
  "#7d3fc9",
  "#6b31b2",
  "#5f2ba0",
  "#52238d",
];
const neutralColor: MantineColorsTuple = [
  "#f5f5f5",
  "#e7e7e7",
  "#cdcdcd",
  "#b2b2b2",
  "#9a9a9a",
  "#8b8b8b",
  "#848484",
  "#717171",
  "#656565",
  "#242424",
];

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  if (input.variant === "filled") {
    const parsed = parseThemeColor({ color: input.color, theme: input.theme });
    const colorName = parsed.color;
    const shadeIndex = parsed.shade ?? 6;
    const colors = input.theme.colors[colorName];

    if (colors) {
      const hoverShade = Math.min(Number(shadeIndex) + 1, 9);
      return {
        ...defaultResolvedColors,
        hover: colors[hoverShade]!,
      };
    }
  }

  return defaultResolvedColors;
};

export const theme = createTheme({
  variantColorResolver,
  primaryColor: "brand",
  colors: {
    brand: brandColor,
    neutral: neutralColor,
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    "2xl": "48px",
    "3xl": "64px",
    "4xl": "96px",
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
    Modal: Modal.extend({
      styles: {
        header: {
          padding: "20px",
          borderBottom: "1px solid var(--mantine-color-neutral-8)",
        },
        content: {
          border: "1px solid var(--mantine-color-neutral-8)",
        },
        body: {
          padding: "0px",
        },
      },
    }),
  },
});
