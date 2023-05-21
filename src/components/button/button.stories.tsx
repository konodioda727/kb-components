import React from "react";
import Button from "./button";
import { ComponentMeta, ComponentStory, composeStory } from '@storybook/react'
import { ButtonSize, ButtonType, ButtonProps } from "./button";
// import {mdx} from './button.mdx'
// storybook的主目录
const buttonMeta: ComponentMeta<typeof Button> = {
    title: 'button',
    component: Button,
    // parameters: {
    //     docs: {
    //         page: mdx
    //     }
    // }
}
export default buttonMeta

const Template: ComponentStory<typeof Button> = (args) => {
    return <Button {...args}></Button>
}

// 分页1

export const Default = Template.bind({})
// 创建副本
Default.args = {
    children: 'DefaultButton',
    btnType: ButtonType.Danger,
    disabled: true
}
Default.storyName = 'buttonType'
// 传入args实现页面上组件可以修改
// export const Default: ComponentStory<typeof Button> = (args) => {
//     return <Button {...args}>default button</Button>
// }
// Default.storyName = 'buttonType'



// decorators对组件进行修饰
Default.decorators = [
    (Story) => (
        <div style={{margin:'50px'}}><Story></Story></div>
    )
]

// 分页2
export const BButtonSize: ComponentStory<typeof Button> = () => {
    return (
        <>
            <Button size={ButtonSize.Large}> large button </Button>
            <Button size={ButtonSize.Small}> small button </Button>
        </>
    )
}
BButtonSize.storyName = 'buttonSize'



export const Disabled = Template.bind({})
Disabled.args = {
    disabled: true,
    children: 'disabled'
}
Disabled.storyName = 'button-disabled'