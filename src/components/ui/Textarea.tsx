import { forwardRef, type Ref, type TextareaHTMLAttributes } from "react"

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    name: string
    className?: string,
    placeholder:string,
    value?:string
}

const Textarea = forwardRef(({name,value,className,placeholder, ...props}:IProps , ref:Ref<HTMLTextAreaElement>) => {
const classes = `${className} w-full bg-zinc-700 rounded px-3 py-1 text-white placeholder:text-white/50`
  return (
    <textarea ref={ref} name={name} value={value} className={classes} placeholder={placeholder} {...props}/>
  )
})

export default Textarea

