import React, { startTransition, useState } from 'react'

const Cocurrent:React.FC = () => {
    const [input, setinput] = useState('12')
    const [searchData, setSearchData] = useState<number[]>([])
// startTransition 非紧急更新，state更新可以被打断
    const updateInput = (e:React.ChangeEvent<HTMLInputElement>)=> {
        const value = e.target.value
        setinput(value)

        
        startTransition(() => {
            const arr = Array.from({length:10000},(_,i) => new Date().getTime()+i)
            setSearchData(arr)
        })
        
    }
    return (
        <>
        <input type={'text'} value={input} onChange={updateInput }></input>
        {searchData.map((item)=>{
            return <option key={item}> {item}</option>
        })}
        </>
    )
}
export default Cocurrent