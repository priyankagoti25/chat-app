import { useFormik } from "formik";
import { signupValidationSchema } from "../../../utils/validationSchema.js"
import { MessageSquare } from "lucide-react";

const Signup = () => {

    const formikForm = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            password: ""
        },
        enableReinitialize: true,
        validationSchema: signupValidationSchema,
        onSubmit: (values) => {
            console.log(values)
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
                </div>
            </div>
        </div>
    );
};

export default Signup;