import { useForm, type SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"
import schema from "../utils/schema"
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMsg from "../components/ui/ErrorMsg";
import api from "../config/axios.config";

interface IFormInput {
  username: string
  email: string
  password: string
}
const Register = () => {
    const { register, handleSubmit ,formState: { errors }} = useForm<IFormInput>({resolver: yupResolver(schema)})
    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
      try{
        console.log(data)
        const response = await api.post("/auth/local/register",data)
        console.log(response)
      }catch(errors){
        console.log(errors)
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
                <Button type="submit">submit</Button>
            </form>
      </section>
    </>
  )
}



export default Register