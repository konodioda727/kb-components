import React, { createContext, useState } from "react";
import classNames from "classnames";
import { tabItemProps } from "./tabItem";

export interface TabProps {
    activeIndex?: string;
    children?: React.ReactNode;
    onClick?: (index:string) => void;
    className?: string;
    style?: React.CSSProperties
}
export interface ITabContext {
    index?: string;
    onClick?: (index:string) => void;
}
export const TabContext = createContext<ITabContext>({index:'0'})
export const Tabs:React.FC<TabProps> = (props) => {
    const {
        activeIndex,
        children,
        onClick,
        className,
        style
    } = props

    const classes = classNames('tab',className)
    const [actIndex,setactIndex] = useState(activeIndex)


    const handleClick = (index: string) => {
        setactIndex(index)
        if(onClick) {
            onClick(index)
            console.log(index);
            
        }
    }
    const passedContext:ITabContext = {
        index:actIndex?actIndex:'0',
        onClick:handleClick
    }
    
    

    const renderChildren = () => {
        return React.Children.map(children,(child,index) => {
            const childElement = child as React.FunctionComponentElement<tabItemProps>
            const { displayName } = childElement.type
            if(displayName === 'TabItem') {
                return React.cloneElement(childElement, {
                    index:index.toString()
                })
            }
            else {
                console.log('not TabItem');
            }
        })
    }
    return (
        <ul className={classes} style = {style}>
            <TabContext.Provider value={passedContext}>
             {renderChildren()}
            </TabContext.Provider>
        </ul>
        
       
           
        
    )
}
Tabs.defaultProps = {
    activeIndex:'0'
}
export default Tabs