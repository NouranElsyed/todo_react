import {  NavLink } from "react-router-dom"
import Button from "../components/ui/Button"


const Welcome = () => {
  return (
    <>
        <div>
            <div className="text-4xl">Welcome to todo manager</div>
            <div className="flex justify-center space-x-5 mt-5">
                <NavLink to={'/login'}><Button>log in</Button></NavLink>
                <NavLink to={'/register'}><Button>register</Button></NavLink>
            </div>
        </div>
    </>
  )
}

export default Welcome