import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import uploadFile from "../utils/mediaUpload"

const url = "https://qnhnymujzdqqwdcjfqia.supabase.co"
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuaG55bXVqemRxcXdkY2pmcWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNTcyNjcsImV4cCI6MjA4MTYzMzI2N30.TJNx6rG66y5lvlRwN1RMBpkeLgGlq4HhCFQk5tZDGpA'

const supabase = createClient(url, key)

export default function TestPage() {

    const [file, setFile] = useState(null)

    async function handleUpload() {
        const url = await uploadFile(file)
        console.log(url)
    }

    return(
        <div className="w-full h-full flex justify-center items-center">
            <input type="file" onChange={(e) => {
                
                setFile(e.target.files[0])

            }}/>
            <button className="w-[80px] bg-red-500 text-primary flex justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-red-600"
                    onClick={handleUpload}>
                Upload
            </button>
        </div>
    )
}