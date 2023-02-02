import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { AboutSection } from "../components/HomeSections/AboutSection"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"

export default {
  title: "Components/AboutSection",
  component: AboutSection,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
    viewports: INITIAL_VIEWPORTS,
    //👇 Your own default viewport
    defaultViewport: "iphone6",
  },
  argTypes: {
    about: { control: "textarea" },
  },
} as ComponentMeta<typeof AboutSection>

const Template: ComponentStory<typeof AboutSection> = (args) => (
  <AboutSection {...args} />
)

export const Default = Template.bind({})
Default.args = {
  about:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
}
