import { forwardRef, type InputHTMLAttributes, type Ref } from "react"

interface IProps  extends InputHTMLAttributes<HTMLInputElement>  {
    name: string
    type: string,
    className?: string,
    placeholder:string,
    value?: string;
   
}
const Input = forwardRef(({value,name,type,className,placeholder, ...props}:IProps , ref:Ref<HTMLInputElement>) => {
const classes = `${className} w-full bg-zinc-700 rounded px-3 py-1 text-white placeholder:text-white/50`
  return (
    <input ref={ref} name={name}  value={value} type={type} className={classes} placeholder={placeholder} {...props}/>
  )
})

export default Input