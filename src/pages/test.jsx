import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import uploadFile from "../utils/mediaUpload"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey);

export default function TestPage() {

    // const [file, setFile] = useState(null)

    // async function handleUpload() {
    //     const url = await uploadFile(file)
    //     console.log(url)
    // }

    // return(
    //     <div className="w-full h-full flex justify-center items-center">
    //         <input type="file" onChange={(e) => {
                
    //             setFile(e.target.files[0])

    //         }}/>
    //         <button className="w-[80px] bg-red-500 text-primary flex justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-red-600"
    //                 onClick={handleUpload}>
    //             Upload
    //         </button>
    //     </div>
    // )

    return (
        <div className="w-full h-full bg-red-700 lg:bg-green-800">

        </div>
    )
}