import React, { FunctionComponentElement, useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import { Icon } from '../icon/icon'
import Transition from '../transition/transition'

export interface SubMenuProps {
    index?: string;
    title:string;
    className?: string;
    children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props) =>  {
   
    const {
        index,
        title,
        className,
        children
    } = props
    const context = useContext(MenuContext)

    // 判断是否需要默认展开
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [menuOpen, setmenuOpen] = useState(isOpened)


    const classes = classNames(className,'submenu-item',{
        'active': context.index === index
    })

    // 实现当横向的时候，hover出列表，纵向的时候点击出列表
    let timer: any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setmenuOpen(toggle)
        },300)
    }
    const handleClick = (e:React.MouseEvent) => {
        e.preventDefault()
        setmenuOpen(!menuOpen)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick:handleClick
    } : {}
    const hoverEvents = context.mode  !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)}
    } : {}



    // 判断children是否为menuitem，否则报错
    const renderChildren = () => {
        const subClasses = classNames('submenu',{
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children,(child,i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                  })
            } else {
                console.log('err: not MenuItem');
                
            }
        })
        return (
            <Transition
                in={menuOpen}
                timeout={300}
                animation="zoom-in-top"
            >
                <ul className={subClasses}>
                {childrenComponent}
                </ul>
            </Transition>
        )
    }
       
    
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>{title}
            <Icon icon="angle-down" color="primary" className="arrow-icon"></Icon>
               
            </div>
            {renderChildren()}
            
        </li>
    )
}
SubMenu.displayName = 'SubMenu'
export default SubMenu