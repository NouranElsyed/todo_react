import type { ReactNode } from "react"

interface IProps {  
    children: ReactNode,
    type?: "submit" | "reset" | "button"
}
const Button = ({children,type}:IProps) => {
  return (
    <button type={type} className="rounded-lg cursor-pointer bg-cyan-700 font-medium text-white px-3 py-2">{children}</button>
  )
}
export default Button