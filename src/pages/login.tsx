import { useForm, type SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button"
import toast from "react-hot-toast"
import api from "../config/axios.config"
import type { AxiosError } from "axios";
import type { IAxiosError } from "../interface/IAxiosError"
import { useState } from "react"
import Input from "../components/ui/Input"
import ErrorMsg from "../components/ui/ErrorMsg"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../utils/schema";
import { useNavigate } from "react-router-dom";

interface IFormInput {
   identifier: string
  password: string
}
const Login = () => {
  const navigate= useNavigate()
  const [isLoading,setIsLoading] = useState(false)
    //* react react hook form and yup resolver for validation
    const { register, handleSubmit ,formState: { errors }} = useForm<IFormInput>({resolver: yupResolver(loginSchema)})
  //* handle submit   
    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
      setIsLoading(true)
      try{
        //* connect to api 
        console.log(data)
        const response = await api.post("/auth/local",data)
        console.log(response.data)
        localStorage.setItem("User" , JSON.stringify(response.data))
        if(response.status === 200){
    
        toast.success('Welcome Back!',
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
    //* nvigate to register
    const  navigateToRegister =()=>{
      navigate('/register')
    }

  return (
    <>
      <section className="w-full h-screen flex flex-col justify-center items-center ">
            <h3 className="text-2xl">Login to manage your todo 🤍</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="w-3/4 md:w-1/2 lg:w-1/4 flex flex-col justify-center items-center mt-10 space-y-5">
                <div className="w-full flex flex-col ">
                <Input placeholder="Email..." type="email" {...register("identifier")} />
                <ErrorMsg msg={errors?.identifier?.message} display={true}/>
                </div>
                <div className="w-full flex flex-col ">
                <Input placeholder="Password..." type="password" {...register("password")} />
                <ErrorMsg msg={errors?.password?.message} display={true}/>
                </div>
                <Button isLoading={isLoading} type="submit">submit</Button>
                <p>Don't have account <span className="text-blue-700 underline cursor-pointer" onClick={navigateToRegister}>register</span></p>
            </form>
      </section>
    </>
  )
}

export default Login



 