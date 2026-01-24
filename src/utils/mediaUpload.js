import { createClient } from "@supabase/supabase-js"
import { supabase } from "../lib/supabase";


const url = "https://qnhnymujzdqqwdcjfqia.supabase.co"
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuaG55bXVqemRxcXdkY2pmcWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNTcyNjcsImV4cCI6MjA4MTYzMzI2N30.TJNx6rG66y5lvlRwN1RMBpkeLgGlq4HhCFQk5tZDGpA'

// const supabase = createClient(url, key)

export default function uploadFile(file) {
    return new Promise(
        (resolve, reject) => {
            const timestamp = Date.now()
            const fileName = timestamp + "_" + file.name
            supabase.storage.from("images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false
        }).then(() => {
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
            resolve(publicUrl)
        }
        ).catch((error) => {
            reject(error)
        })
        }
    )
}