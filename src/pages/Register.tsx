import { useForm, type SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMsg from "../components/ui/ErrorMsg";
import api from "../config/axios.config";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { IAxiosError } from "../interface/IAxiosError";
import { useState } from "react";
import {registerSchema} from "../utils/schema";

interface IFormInput {
  username: string
  email: string
  password: string
}
const Register = () => {

  
  const [isLoading,setIsLoading] = useState(false)
  
  //* react react hook form and yup resolver for validation
    const { register, handleSubmit ,formState: { errors }} = useForm<IFormInput>({resolver: yupResolver(registerSchema)})
  //* handle submit   
    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
      setIsLoading(true)
      try{
        //* connect to api 
        console.log(data)
        const response = await api.post("/auth/local/register",data)
        console.log(response)
        localStorage.setItem("User" , JSON.stringify(response.data))
        if(response.status === 200){
    
        toast.success('Successfully joined!',
          {
            duration: 4000,
            position: 'top-center',
          })
        setTimeout(()=>{
          location.replace('/home')
        },2000)
      }
      }catch(errors){
        //* manage error msg
        console.log(errors)
        const AxiosError = errors  as AxiosError<IAxiosError>

        const ErrMsg = AxiosError?.response?.data?.error?.message || "Unexpected error accer"

         toast.error(ErrMsg,
          {
            duration: 4000,
            position: 'top-center',
          })
      }finally{
        setIsLoading(false)
      }
    }
  return (
    <>
      <section className="w-full h-screen flex flex-col justify-center items-center ">
            <h3 className="text-2xl">Register to manage your todo 🤍</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 flex flex-col justify-center items-center mt-10 space-y-5">
                <div className="w-full flex flex-col ">
                  <Input placeholder="User name..." type="text" {...register("username")} />
                  <ErrorMsg msg={errors?.username?.message} display={true}/>
                </div>
                <div className="w-full flex flex-col ">
                <Input placeholder="Email..." type="email" {...register("email")} />
                <ErrorMsg msg={errors?.email?.message} display={true}/>
                </div>
                <div className="w-full flex flex-col ">
                <Input placeholder="Password..." type="password" {...register("password")} />
                <ErrorMsg msg={errors?.password?.message} display={true}/>
                </div>
                <Button isLoading={isLoading} type="submit">submit</Button>
            </form>
      </section>
    </>
  )
}



export default Register