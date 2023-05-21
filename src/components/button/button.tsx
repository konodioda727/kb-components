import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

export interface BaseButtonProps {
    className?: string;
    /**禁用button */
    disabled?: boolean;
     /**禁用button */
    size?: ButtonSize;
     /**禁用button */
    btnType?: ButtonType;
     /**禁用button */
    children?: React.ReactNode;
     /**禁用button */
    href?: string;

}
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement> & BaseButtonProps
// buttonhtmlsttributes拿到所有button属性 ,& 为联合属性
type AcnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement> & BaseButtonProps

// 现在buttonProps含有所有button属性
export type ButtonProps = Partial<NativeButtonProps & AcnchorButtonProps>
/**
 * @param props
 * @returns
 */
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 * 
 * ```javascript
 * import { Button } from 'reactts'
 * ```
 */
export const Button:React.FC<ButtonProps> = (props)=>{

    const {
        btnType,
        className,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props

    const classes = classNames('btn',className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === ButtonType.Link) && disabled
    })
    
    if (btnType === ButtonType.Link && href) {
        return(
            <>
                <a
                className={classes} href={href} {...restProps}>{children}</a>
            </>
        )
    } else {
        return (
            <>
                <button className={classes} disabled = {disabled} {...restProps}>{children}</button>
            </>
        )
    }
    
}

Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}
export default Button