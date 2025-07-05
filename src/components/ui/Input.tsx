interface IProps {
    name: string
    type: string,
    className?: string,
    placeholder:string
}
const Input = ({name,type,className,placeholder}:IProps) => {
const classes = `${className} w-full bg-zinc-700 rounded px-3 py-1 text-white placeholder:text-white`
  return (
    <input name={name} type={type} className={classes} placeholder={placeholder}/>
  )
}

export default Input