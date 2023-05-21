import React, { useContext, useState } from "react";
import classNames from "classnames";
import Tabs, { TabContext } from "./tabs";

export interface tabItemProps {
    index?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    title: string
}

export const TabItem:React.FC<tabItemProps> = (props) => {
    const {
        index,
        children,
        disabled,
        className,
        style,
        title
    } = props


    const [tabOpen, settabOpen] = useState(true)
    const context = useContext(TabContext)


    const classes = classNames('tabItem',className,{
        'disabled':disabled,
        'active':context.index === index
    })
    const subClasses = classNames('subtab',{
        'tab-opened': context.index === index
    })
    const handleClick = () => {
        if(context.onClick && !disabled) {
            context.onClick(index?index:'0')
            settabOpen(!tabOpen)
        }
    }
    return (
        <li className={classes} key={index} onClick={handleClick}>
            <div className="subtab-title">{title}</div>
            <div className={subClasses}>
                {children}
            </div>
        </li>
    )
}
TabItem.displayName = 'TabItem'
export default TabItem