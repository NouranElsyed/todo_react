import * as yup from "yup";
export const registerSchema = yup
  .object({
    username: yup
      .string()
      .min(3, "user name must be at least 3 characters")
      .required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();

export const loginSchema = yup
  .object({
    identifier: yup
      .string()
      .email("Invalid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  })
  .required();


export const taskSchema = yup
  .object({
    title: yup.string().min(3, "title must be at least 3 characters").required("title is required"),
    description: yup
      .string()
      .min(5, "description must be at least 5 characters").required().default(""),
  });
