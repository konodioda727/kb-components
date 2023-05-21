import React from "react";
import Input from "./input";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const inputMeta: ComponentMeta<typeof Input> = {
    title:'input',
    component: Input
}
export default inputMeta

const Template: ComponentStory<typeof Input> = (args) => {
    return <Input {...args}></Input>
}

export const Default = Template.bind({})

Default.args = {
    disabled: false,
    prepand: '1235',
    append: '2468',
    size: 'lg',
    icon:'coffee'
}
Default.storyName = 'Default Input'
