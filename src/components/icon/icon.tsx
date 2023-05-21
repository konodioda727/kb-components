import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon,FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
    color?: ThemeProps;
    className?: string;
}
export const Icon:React.FC<IconProps> = (props) => {
    const {
        color,
        className,
        ...restProps
    } = props
    const classes = classNames('icon',className, {
        [`icon-${color}`]:color,

    })
    return (
        <FontAwesomeIcon className={classes} {...restProps}/>
    )
}
export default Icon