import { forwardRef, type Ref } from "react"

interface IProps {
    name: string
    type: string,
    className?: string,
    placeholder:string
}
const Input = forwardRef(({name,type,className,placeholder, ...props}:IProps , ref:Ref<HTMLInputElement>) => {
const classes = `${className} w-full bg-zinc-700 rounded px-3 py-1 text-white placeholder:text-white`
  return (
    <input ref={ref} name={name} type={type} className={classes} placeholder={placeholder} {...props}/>
  )
})

export default Input