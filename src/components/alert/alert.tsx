import React, { useState } from "react";
import classNames from "classnames";
import Transition from "../transition/transition";

export type AlertType = 'warning' | 'default' | 'success' | 'danger';

export interface AlertProps {
    title?: string;
    description?: string;
    type?: AlertType;
    closable?: boolean;
}

export const Alert:React.FC<AlertProps> = (props) => {
    const [state, setstate] = useState(true)

    const {
        title,
        description,
        type,
        closable
    } = props


    const classes = classNames('alert',{
        [`alert-${type}`]: type,
        "alert-show":state,
        "alert-off":!state
        
    })

    const titleClass = classNames('alertTitle',{
        'boldTitle': title
    })
    // const DescriptionClass = classNames('alertDescription',{
    //     'description': description
    // })

    const handleClose = () => {
        setstate(!state)
    }

    
    return (
        <div>
            <Transition in={closable} timeout={300} animation={'zoom-in-top'}>
                <div className={classes} >
                    <div className={titleClass}>{title}</div>
                    <div className="alert-description">{description}</div>
                    {closable && <div className="alert-close" onClick={handleClose}>x</div>}
                </div>
                
            </Transition>
        
        </div>
        
    )
}
Alert.defaultProps = {
    type: 'default',
    closable: true,
  }
export default Alert