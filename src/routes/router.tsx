import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Welcome from '../pages/Welcome'
import Login from '../pages/login'
import Register from '../pages/Register'
import ProtectedRoute from './ProtectedRoute'
import Home from '../pages/Home'

const user = localStorage.getItem('User')
const parsedUser = user? JSON.parse(user):null
const token = parsedUser?.jwt
const logined : boolean = token? true : false
console.log(logined)
console.log(parsedUser)
const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={
                <ProtectedRoute  isAllowed={logined} redirectPath='/login'>
                    <Home/>
                </ProtectedRoute>
            }/>
        </>
    )
) 
export default router