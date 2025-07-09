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

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Welcome />} />
             <Route path="/login" element={
                <ProtectedRoute  isAllowed={!logined} redirectPath='/home'>
                        <Login/>
                </ProtectedRoute>}/>
             <Route path="/register" element={
                <ProtectedRoute  isAllowed={!logined} redirectPath='/home'>
                        <Register />
                </ProtectedRoute>}/>
            <Route path="/home" element={
                <ProtectedRoute  isAllowed={logined} redirectPath='/login'>
                    <Home/>
                </ProtectedRoute>
            }/>
        </>
    )
) 
export default router