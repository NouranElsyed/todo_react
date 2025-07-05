import { useForm, type SubmitHandler } from "react-hook-form"
import Button from "../components/ui/Button"

interface IFormInput {
  firstName: string
}
const Login = () => {
    const { register, handleSubmit } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName")} />
            <Button type="submit">submit</Button>
        </form>
    </>
  )
}

export default Login