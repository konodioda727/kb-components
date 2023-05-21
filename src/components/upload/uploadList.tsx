import React from "react";
import { UploadFile } from "./upload";
import Icon from "../icon/icon";
import Progress from "../progress/progress";

interface UploadFileListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
    // children: React.ReactNode
}

export const UploadList: React.FC<UploadFileListProps> = (props) => {
    const {
        fileList,
        onRemove
    } =props;

    return (
        <ul className="upload-list">
            {fileList.map(item => {
                return (
                    <li className="upload-list-item" key={item.uid}>
                        <span className={`file-name file-name-${item.status}`}>
                            <Icon icon={'file-alt'} color='secondary'></Icon>
                        </span>
                        <span className="file-status">

                        </span>
                        <span className="file-action">
                            <Icon icon='times' onClick={()=>{onRemove(item)}}></Icon>
                        </span>
                        {item.status === 'uploading' && 
                            <Progress percent={item.percent || 0}></Progress>
                        }
                    </li>
                )
            })}
        </ul>
    )
}
export default UploadList;