import { useEffect, useState } from "react"
import api from "../config/axios.config"
import Button from "./ui/Button"

interface IuserDetails{
documentId?:string
email?:string
id?: number
todos?:{
IsDone?:boolean
description?: string
documentId?: string
id?: number
title?: string
}[]
username?: string
}

const user = localStorage.getItem('User')
const parsedUser = user? JSON.parse(user):null
const token = parsedUser?.jwt
const TodoList = () => {
    const [user,setUser] = useState<IuserDetails|null>(null)

    useEffect(()=>{
        try{
            api.get('/users/me?populate[todos][filters][publishedAt][$notNull]=true',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then(res=>{
                setUser(res.data)}).catch(err=>console.log(err))
        }catch(err){
            console.log(err)
        }
    },[])
    
  return (
    <>
    {
       user?.todos?.map((todo)=>{
        return(
           <div key={todo.id} className="flex items-center justify-between space-x-30 bg-[rgba(71,71,105,0.28)] px-5 py-2 rounded-lg mb-3">
               <p>{todo.title}</p>
               <div className="flex space-x-2">     
                 <Button className="">update</Button>
                 <Button className="bg-red-700">delete</Button>
               </div>
             </div>
        )
       })
    }
    </>
  )
}

export default TodoList