import * as yup from "yup"
 export const registerSchema = yup
  .object({
  username: yup.string().min(3,"user name must be at least 3 characters").required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  })
  .required()


 export  const loginSchema = yup
  .object({
  identifier: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  })
  .required()
