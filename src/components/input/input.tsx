import React, { InputHTMLAttributes,ReactElement } from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Icon } from "../icon/icon";

export type prepandType = string | ReactElement
export type inputSize = 'lg' | 'small';

export interface inputProps extends Omit<InputHTMLAttributes<HTMLElement>,'size'> {
    disabled?: boolean;
    size?: inputSize;
    icon?: IconProp;
    prepand?: prepandType;
    append?: prepandType;
}

export const Input:React.FC<inputProps> = (props) => {
    const {
        disabled,
        size,
        icon,
        prepand,
        append,
        ...restProps
    } = props

    const classes = classNames('input', {
        disabled,
        [`input-${size}`]: size,
        'input-group':prepand || append,
        'input-group-append':append,
        'input-group-prepand':prepand
    })
    return (
       <div className={classes}>
            {prepand?<div className="input-prepand">{prepand}</div>:''}
            {icon && <div className="input-icon"><Icon icon={icon} title={`title-${icon}`}/></div>}
            <input className='input-inner' {...restProps} disabled={disabled}></input>
            {append?<div className="input-append">{append}</div>:''}
       </div>
    )
}
export default Input