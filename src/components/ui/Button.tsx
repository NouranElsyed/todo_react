import type { ReactNode } from "react"

interface IProps {  
    children: ReactNode,
    type?: "submit" | "reset" | "button"
    isLoading?: boolean
}
const Button = ({children,type,isLoading}:IProps) => {
  const classes = `${isLoading? "cursor-not-allowed bg-indigo-400" : "cursor-pointer bg-indigo-600 hover:bg-indigo-500"} flex items-center rounded-lg text-sm leading-6 font-semibold text-white transition duration-150 ease-in-out  px-4 py-2`
  return (
    <button disabled={isLoading} type={type} className={classes}>
      {isLoading && 
      <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>}
      {children}
    </button>
  )
}
export default Button