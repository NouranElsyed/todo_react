import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Welcome from '../pages/Welcome'
import Login from '../pages/login'
import Register from '../pages/Register'

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        </>
    )
) 
export default router