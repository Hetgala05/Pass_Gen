import React,{useState, useEffect, useCallback, useRef} from "react";

const Password = () => {

    const [password, setPassword] = useState('')
    const [length, setLength] = useState(7)
    const [numAllowed, setNumAllowed] = useState(false)
    const [charAllowed, setCharAllowed] = useState(false)
    const passwordRef = useRef(null)

    const copyPassword = () =>{
        window.navigator.clipboard.writeText(password)
        passwordRef.current.focus()
        passwordRef.current.select()
     }

    const generatePassword = useCallback(()=>{
        let pass=""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if (numAllowed) str += "1234567890"
        if (charAllowed) str += "@#$%^&*()-=+/*-"

        for(let i=0;i<length;i++){
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char) 
        }
        setPassword(pass)

    },[length, charAllowed, numAllowed])

    useEffect(()=>{
        generatePassword()
    },[length, charAllowed, numAllowed, generatePassword])

    return(
        <div className="text-center w-[800px] mx-auto my-[13rem] bg-[#8080803b] text-white rounded-md h-[20rem]">
            <h1 className="p-5 text-2xl">
                Password Generator
            </h1>
            <div className="relative">
                <input className="p-3 w-[500px] rounded-md text-[#ff5e00] text-2xl"
                    placeholder="Password"
                    type = "text"
                    value = {password}
                    ref={passwordRef}
                    readOnly
                />
                <i className="absolute top-1/2 transform -translate-y-1/2 -translate-x-10 text-gray-700 cursor-pointer" onClick = {copyPassword}> 
                    <i  class="fa fa-clone fa-2x"></i>
                </i>
            </div>
            <div className="p-4">
                <input 
                    type="range"
                    value = {length}
                    onChange ={(e)=>setLength(e.target.value)}
                />
                <label htmlFor="length" className="pr-4">Length : {length}</label>

                <input
                    type = "checkbox"
                    defaultChecked = {numAllowed}
                    onChange = {(e)=>
                        setNumAllowed(!numAllowed)
                    }
                />
                <label htmlFor="Number" className="pr-4">Number</label>
                
                <input
                    type="checkbox"
                    defaultChecked = {charAllowed}
                    onChange = {(e)=>{
                        setCharAllowed(!charAllowed)
                    }}
                />
                <label htmlFor="Character" className="pr-4">Character</label>
            </div>
        </div>
    )
}
export default Password;