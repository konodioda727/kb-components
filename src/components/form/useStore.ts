import { useState } from "react";
import { useReducer } from "react";

export interface FieldDetail {
    name: string;
    value: string;
    rules: any[];
    error: any[];
    isValid: boolean;
}

export interface FieldState {
    [key:string] : FieldDetail
}

export interface FormState {
    isValid: boolean;
}
export interface FieldsAction {
    type:'addField';
    name:string;
    value:any
} 
function filedsReducer(state: FieldState, action:FieldsAction):FieldState {
    switch (action.type) {
        case 'addField': 
            return {
                ...state,
                [action.name]:{...action.value}
            }
        default: return state
    }
}
function useStore() {
    const [formState, setformState] = useState<FormState>({isValid:true})
    const [fields, dispatch] = useReducer(filedsReducer,{})
    return {
        fields,
        dispatch,
        formState
    }
}
export default useStore