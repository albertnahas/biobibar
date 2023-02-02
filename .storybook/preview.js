import "../styles/globals.css"
import * as NextImage from "next/image";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    layout: 'fullscreen',
  },
}


const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});