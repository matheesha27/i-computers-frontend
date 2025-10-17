import { useState } from "react";

export default function Test() {

    const [count, setCount] = useState(0)
    const [status, setStatus] = useState("On")

    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-[400px] h-[300px] bg-red-200 shadow-2xl flex justify-center items-center">
                <button className="w-[100px] h-[50px] bg-red-800 text-white"
                        onClick={() => {
                            setCount(count - 1)
                        }}>
                            Decrement
                </button>
                <h1 className="w-[100px] h-[50px] text-[30px] text-center">
                    {count}
                </h1>
                <button className="w-[100px] h-[50px] bg-blue-800 text-white"
                        onClick={() => {
                            setCount(count + 1)
                        }}>
                            Increment
                </button>
            </div>
            <div className="w-[400px] h-[300px] bg-green-200 flex flex-col justify-center items-center">
                <span className="h-[300px] text-2xl font-bold">
                    {status}
                </span>
                <div className="w-full h-[50px] border flex justify-center">
                    <button className="w-[100px] h-full text-white bg-red-700 border"
                            onClick={() => {
                                setStatus("Off")
                            }}>
                                Off
                    </button>
                    <button className="w-[100px] h-full text-white border bg-green-700"
                            onClick={() => {
                                setStatus("On")
                            }}>
                        On
                    </button>
                </div>
            </div>
        </div>
    )
}