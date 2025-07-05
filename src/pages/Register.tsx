import { useForm, type SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button"
import Input from "../components/ui/Input"

interface IFormInput {
  userName: string
  email: string
  password: string
}
const Register = () => {
    const { register, handleSubmit } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
  return (
    <>
      <section className="w-full h-screen flex flex-col justify-center items-center ">
            <h3 className="text-2xl">Register to manage your todo 🤍</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 flex flex-col justify-center items-center mt-10 space-y-5">
                <Input placeholder="User name..." type="text" {...register("userName")} />
                <Input placeholder="Email..." type="email" {...register("email")} />
                <Input placeholder="Password..." type="password" {...register("password")} />
                <Button type="submit">submit</Button>
            </form>
      </section>
    </>
  )
}



export default Register