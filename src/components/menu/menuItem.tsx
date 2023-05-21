import React, {  useContext } from "react";
import classNames from "classnames";
import {MenuContext} from "./menu";



export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode
}

export const MenuItem: React.FC<MenuItemProps> = (props)=>{
    const {
        index,
        disabled,
        className,
        style,
        children
    } = props

    const context = useContext(MenuContext)

    const classes = classNames('menu-item',className,{
        'disabled': disabled,
        'active': context.index === index
    })
    const handleclick = () => {
        if(context.onSelect && !disabled) {
            context.onSelect(index?index:"0")
        }
    }
    return (
        <li className={classes} style = {style} onClick = {handleclick}>{children}</li>
    )
}
MenuItem.displayName = 'MenuItem'
// displayName判断类型，如果没有display Name，调试时报错只会显示component，添加后可以精确到menuitem
export default MenuItem