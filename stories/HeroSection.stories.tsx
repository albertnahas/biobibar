import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"
import { HeroSection } from "components/HomeSections/HeroSection"

export default {
  title: "components/HeroSection",
  component: HeroSection,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof HeroSection>

const Template: ComponentStory<typeof HeroSection> = (args) => (
  <HeroSection {...args} />
)

export const Default = Template.bind({})
Default.args = {
  slogan: "من عبق حلب بدأنا",
  coverUrl: "./asset1.png",
}
