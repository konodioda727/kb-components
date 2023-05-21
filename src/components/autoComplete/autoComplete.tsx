import React, {FC, useState ,ChangeEvent, ReactElement, useEffect, KeyboardEvent, useRef} from "react";
import Input, {inputProps} from "../input/input";
import Icon from "../icon/icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";

export interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<inputProps, "onSelect"> {
    fetchSuggestions: (keyword:string ) => DataSourceType[] | Promise<DataSourceType>;
    onSelect?: (item:DataSourceType) => void;
    renderOption?: (item:DataSourceType) => ReactElement;
    value?: string;
}
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } = props;
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    useClickOutside(componentRef, () => {setsuggestions([])})
    const [suggestions, setsuggestions] = useState<DataSourceType[]>([])
    const [inputValue, setinputValue] = useState(value as string);
    const [loading, setloading] = useState(false)
    const [highlightIndex, sethighlightIndex] = useState(-1)
    const debounceValue = useDebounce(inputValue, 500)
    const renderTemplate = (item: DataSourceType) => {
        return renderOption?renderOption(item):item.value
    }
    const handleSelect = (item: DataSourceType) => {
         setinputValue(item.value)
         setsuggestions([])
         if(onSelect) {
            onSelect(item)
         }
         triggerSearch.current = false
    }
    useEffect(() => {
        if (debounceValue) {
            const result = fetchSuggestions(debounceValue);
            if(result instanceof Promise) {
                setloading(true)
                result.then(data=>{
                    setloading(false)
                    setsuggestions([data]);
                })
            } else {
                setsuggestions(result)
            }
           
        } else {
            setsuggestions([]);
        }
        sethighlightIndex(-1)
    }, [debounceValue && triggerSearch.current])
    const highLight = (index: number) => {
        if(index < 0) {
            index = 0;
        }
        if(index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        sethighlightIndex(index)
    }
    const handleKeyDown = (e:KeyboardEvent<HTMLInputElement>) => {
        switch(e.keyCode) {
            case 13://enter
                suggestions?handleSelect(suggestions[highlightIndex]):''
                break;
            case 38://上箭头
                highLight(highlightIndex-1)
                break;
            case 40: //下箭头
                highLight(highlightIndex+1)
                break;
            default: 
                setsuggestions([])
                break;
        }
    }
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setinputValue(value)
        triggerSearch.current = true
    }
    const generateDropDown  = () => {
        
        return (
           <ul>
             {suggestions.map((item, index)=>{
                const cnames = classNames('suggestion-item', {
                    'item-highlighted':index === highlightIndex
                })
                return (
                    <li key={index} className={cnames} onClick={() => handleSelect(item)}>{renderTemplate(item)}</li>
                )
            })}
           </ul>
        )
    }
   
    return (
        <div ref= {componentRef}>
            <Input 
            value={value} 
            {...restProps}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
           ></Input>
            {loading && <ul><Icon icon='spinner' spin></Icon></ul>}
            {suggestions.length && generateDropDown()}
        </div>
    )
}