import * as Yup from "yup"
export const signupValidationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
        .email("Invalid email format")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format")
        .required("Email is required"),
    password: Yup.string().required("Password is required")
})