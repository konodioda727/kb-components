import Upload from "./upload";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const UploadMeta:ComponentMeta<typeof Upload> = {
    title:'Upload',
    component:Upload
}
export default UploadMeta

const Template:ComponentStory<typeof Upload> = (args) => {
    return (
        <Upload {...args}></Upload>
    )
}

export const Default = Template.bind({})

Default.args = {
    action: 'https://jsonplaceholder.typicode.com/posts',
    
}