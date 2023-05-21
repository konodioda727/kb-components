import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'


type MenuMode = 'vertical' | 'horizonal'
type selectedCallback = (selectedIndex: string) => void

export interface MenuProps {
    activeIndex?: string;
    mode?: MenuMode;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: selectedCallback
    children?: React.ReactNode
    defaultOpenSubMenus?: string[]
}
export interface IMenuContext {
    index: string;
    onSelect?: selectedCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[]
}
export const MenuContext = createContext<IMenuContext>({index:'0'})
export const Menu:React.FC<MenuProps> = (props)=>{
    const {
        className,
        mode,
        activeIndex,
        style,
        children,
        onSelect,
        defaultOpenSubMenus
    } = props

    const [currentActive, setcurrentActive] = useState(activeIndex)


    const handleSelect = (index: string)=>{
        setcurrentActive(index)
        if(onSelect) {
            onSelect(index)
        }
    }
    const passedContext:IMenuContext = {
        index: currentActive ? currentActive : "0",
        // currenActive可能存在，不存在时为undefined，要加以区分
        onSelect: handleSelect,
        mode: mode,
        defaultOpenSubMenus
    }
    
    const renderChildren = ()=>{
        return React.Children.map(children,(item,index)=>{
            const childElement = item as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type
            if(displayName === 'MenuItem' || 'SubMenu') {
                return React.cloneElement(childElement, {
                    index:index.toString()
                })
            }
            else {
                console.log('err');
            }
        })
    }
    const classes = classNames('menu',className,{
        [`menu-${mode}`]:mode,
    })
    return (
        <>
            <ul className={classes} style = {style}>
                
                {/* <FontAwesomeIcon icon={faCoffee} size='lg'></FontAwesomeIcon> */}
                <MenuContext.Provider value={passedContext}>
                    {renderChildren()}
                </MenuContext.Provider>
                
            </ul>
        </>
    )
}
Menu.defaultProps= {
    mode: 'horizonal',
    activeIndex: "0",
    defaultOpenSubMenus:['1']
}
export default Menu