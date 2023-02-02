import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { AboutBanner } from "../components/HomeSections/AboutBanner"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/AboutBanner",
  component: AboutBanner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    text: { control: "text" },
    imageUrl: { control: "text" },
  },
} as ComponentMeta<typeof AboutBanner>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AboutBanner> = (args) => (
  <AboutBanner {...args} />
)

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  text: "Banner text",
  imageUrl: "./asset4.png",
}
