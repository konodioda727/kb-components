import classNames from "classnames";
import React, {FC, ReactNode} from "react";

export interface formItemProps {
    label?: string;
    children: ReactNode;
}

export const FormItem: FC<formItemProps> = (props) => {
    const {
        label,
        children
    } = props;
    const rowClass = classNames('kb-row', {
        'kb-row-no-label': !label
    })
    return (
        <div>
            {
                label && 
                    <div className="kb-form-label">
                        <label title={label}>
                            {label}
                        </label>
                    </div>
            }
            <div className="kb-form-item">{children}</div>
        </div>
    )
}
export default FormItem