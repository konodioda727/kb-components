import React from "react";
import Icon from "../icon/icon";
import { ThemeProps } from "../icon/icon";

export interface ProgressProps {
    percent?: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
const Progress:React.FC<ProgressProps> = (props) => {
    const {
        percent,
        strokeHeight,
        showText,
        styles,
        theme,
    } = props
    return (
        <div className="progress-bar">
            <div className="progress-bar-outer" style={{height: `${strokeHeight}`}}>
                <div className={`progress-bar-inner color-${theme}`} style={{width: `${percent}%`}}>
                    {showText && <span className="inner-text">{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
}

Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: 'danger'
}
export default Progress