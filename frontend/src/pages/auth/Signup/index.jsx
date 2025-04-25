import {ErrorMessage, useFormik} from "formik";
import { signupValidationSchema } from "../../../utils/validationSchema.js"
import {MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader2} from "lucide-react";
import {useState} from "react";
import {useAuthStore} from "../../../store/useAuthStore.js";
import {Link} from "react-router-dom";
import AuthImagePattern from "../../../components/AuthImagePattern/index.jsx";

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false)

    const {isSigningUp, signup} = useAuthStore()

    const formikForm = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: ""
        },
        enableReinitialize: true,
        validationSchema: signupValidationSchema,
        onSubmit: async (values) => {
            await signup(values)
        }
    })

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/*-----left side of form-----*/}
            <div className="flex flex-col items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="size-6 text-primary"/>
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>
                    <form onSubmit={formikForm.handleSubmit} className="space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content opacity-40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10 focus:outline-0`}
                                    placeholder="Jhon Doe"
                                    name="fullName"
                                    value={formikForm.values.fullName}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                />

                            </div>
                            {
                                formikForm.touched.fullName && formikForm.errors.fullName &&
                                <p className="text-red-500">{formikForm.errors.fullName}</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content opacity-40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10 focus:outline-0`}
                                    placeholder="you@gmail.com"
                                    name="email"
                                    value={formikForm.values.email}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                />
                            </div>
                            {
                                formikForm.touched.email && formikForm.errors.email &&
                                <p className="text-red-500">{formikForm.errors.email}</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content opacity-40" />
                                </div>
                                <input
                                    type={showPassword? "text" : "password"}
                                    className={`input input-bordered w-full pl-10 focus:outline-0`}
                                    placeholder="******"
                                    name="password"
                                    value={formikForm.values.password}
                                    onChange={formikForm.handleChange}
                                    onBlur={formikForm.handleBlur}
                                />
                                <button
                                    type="button"
                                    className="absolute z-10 inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {
                                        showPassword ?
                                            (<EyeOff className="size-5 text-base-content opacity-40"/>) :
                                            (<Eye className="size-5 text-base-content opacity-40"/>)
                                    }
                                </button>
                            </div>
                            {
                                formikForm.touched.password && formikForm.errors.password &&
                                <p className="text-red-500">{formikForm.errors.password}</p>
                            }
                        </div>
                        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                            {
                                isSigningUp ? (
                                    <>
                                        <Loader2 className="size-5 animate-spin"/>
                                        Loading...
                                    </>
                                ) : ("Create Account")
                            }
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-base-content opacity-80">
                            Already have account? {" "}
                            <Link to="/login" className="link link-primary">
                                Sing In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/*-----right side of form-----*/}
            <AuthImagePattern
                title="Join our community"
                subTitle="Connect with friends, share moments, stay in touch with your loved ones"
            />
        </div>
    );
};

export default Signup;