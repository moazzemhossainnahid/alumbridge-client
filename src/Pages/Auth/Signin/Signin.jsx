import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../../firebase.init';
import UseToken from '../../../Hooks/useToken';
import { GiCancel } from "react-icons/gi";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loading from '../../../Components/Others/Loading/Loading';
 
const Signin = () => {
    const [signInWithEmailAndPassword, suser, sloading, serror] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
    const { register, handleSubmit, reset, errors } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef()
    //////////
    let someErrorMessages;
    const getFirebaseErrorMessages = (firebaseMessage) => {
        const messages = firebaseMessage?.split("/")[1].split(")")[0]
        someErrorMessages = messages;
    }

    if (serror || gerror) {

        if (serror) getFirebaseErrorMessages(serror?.message)
        if (gerror) getFirebaseErrorMessages(gerror?.message)
    } else {
        someErrorMessages = null
    }
    ///////


    const from = location.state?.from?.pathname || '/';

    const [token] = UseToken(suser || guser);


    if (sloading || gloading) {
        return <Loading />
    }

    // if (serror || gerror || giterror || ferror) {
    //     signinError = <p className="text-red-700">{serror?.message || gerror?.message || giterror?.message || ferror?.message}</p>
    // }


    if (token) {
        navigate(from, { replace: true });
        toast.success("Signin User Successfully")
        window.location.reload();
    }

    const handleSigninform = async (data) => {
      console.log(data);
        const email = data.email;
        const password = data.password;
        await signInWithEmailAndPassword(email, password)
            .then(() => {
                reset();
            })
    }


    const handleGoogleSignin = async () => {
        await signInWithGoogle()
    }

    const handleReset = async () => {
        const email = emailRef.current.value;
        await sendPasswordResetEmail(email);
        toast.success(`Email Sent to ${email}!`);
    }



    return (
        <div className="h-full bg-white w-full px-4">
            <div className="flex flex-col items-center justify-center">
                <div className="bg-white rounded md:w-2/3 w-full p-10 ">
                    {/* <div className="w-full mx-auto py-7">
                        <img src="https://i.ibb.co/7VySsQR/logo.png" alt="" className="w-52 mx-auto" />
                    </div> */}
                    <p tabIndex={0} role="heading" aria-label="Login to your account" className="text-2xl text-center font-semibold tracking-widest leading-6 text-gray-800">
                        Account Sign In
                    </p>
                    <p className="text-sm text-center mt-10 font-medium leading-none text-gray-500">
                        Sign in to your account to access your profile, history, and any private pages you've been granted access to.
                    </p>
                    <form
                        onSubmit={handleSubmit(handleSigninform)}
                        className="py-3"
                    >
                        <div className="space-y-12 w-full h-full mt-10 py-7">
                            <div className="relative z-0 my-2">

                                <input {...register("email", {
                                    required: { value: true, message: "Email is Required" },
                                    pattern: { value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Provide a Valid Email", },
                                })} placeholder=" " required name="email" type="email" id="floating_standard1" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-700 appearance-none dark:border-gray-600 dark:focus:green-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" />
                                <label htmlFor="floating_standard1" className="absolute text-sm text-left w-full justify-start flex text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
                            </div>
                            <label htmlhtmlFor="email">
                                {errors?.email?.type === "required" && (
                                    <span className="text-red-700">{errors.email?.message}</span>
                                )}
                            </label>
                            <label htmlhtmlFor="email">
                                {errors?.email?.type === "pattern" && (
                                    <span className="text-red-700">{errors.email?.message}</span>
                                )}
                            </label>
                            <div className="relative z-0 my-2">

                                <input {...register("password", {
                                    required: { value: true, message: "Password is Required" },
                                   
                                })} placeholder=" " required name="password" type="password" id="floating_standard2" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-700 appearance-none dark:border-gray-600 dark:focus:green-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer" />
                                <label htmlFor="floating_standard2" className="absolute text-sm text-left w-full justify-start flex text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
                            </div>
                            <label htmlhtmlFor="password">
                                {errors?.password?.type === "required" && (
                                    <span className="text-red-700 text-5xl">{errors.password?.message}</span>
                                )}
                            </label>
                            <label htmlhtmlFor="password">
                                {errors?.password?.type === "pattern" && (
                                    <span className="text-red-700 text-5xl">{errors.password?.message}</span>
                                )}
                            </label>
                        </div>
                        <span className="text-gray-400 hover:text-accent">
                            <label for="reset-pass-modal" className="btn text-xs modal-button capitalize btn-link btn-xs p-0">
                                forgot Your Password?
                            </label>
                        </span>
                        <div className="mt-8">
                            <button type="submit" role="button" aria-label="create my account" className="bg-gray-900 hover:bg-gray-700 btn btn-lg rounded-full font-semibold w-40 mx-auto text-white capitalize flex justify-center">
                                Sign In
                            </button>
                        </div>
                    </form>
                    {
                        someErrorMessages &&
                        <div className="some-error-message p-4 m-4 w-2/3 mx-auto bg-red-100  text-red-600 border rounded-lg text-sm  flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {someErrorMessages}
                        </div>
                    }
                    <div className="py-7 text-center">
                        <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                            Dont have account?{" "}
                            <span onClick={() => navigate("/signup")} tabIndex={0} role="link" aria-label="Sign up here" className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
                                {" "}
                                Sign up here
                            </span>
                        </p>
                    </div>
                    <div className="w-full flex items-center justify-between py-5">
                        <hr className="w-full bg-gray-400" />
                        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                        <hr className="w-full bg-gray-400  " />
                    </div>

                    <button onClick={handleGoogleSignin} aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex justify-center items-center w-2/3 mx-auto text-center mt-10">
                        <svg width={19} height={20} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                            <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                            <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                            <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                        </svg>
                        <p className="text-base text-center font-medium ml-4 text-gray-700">Continue with Google</p>
                    </button>

                </div>
            </div>
            <>
                <input type="checkbox" id="reset-pass-modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box relative">
                        <label for="reset-pass-modal" className="absolute right-4 top-4">
                            <GiCancel className="text-2xl" />
                        </label>
                        <h3 className="font-bold text-lg">Reset Your Password</h3>
                        <div className="form-control">
                            <input
                                required
                                type="email"
                                name="rsemail"
                                placeholder="Enter Your Email Address"
                                className="input input-bordered input-icon text-base mb-1 focus:outline-none mt-4"
                            />
                        </div>
                        <div className="form-control pt-5">
                            <button onClick={handleReset} className="btn btn-neutral text-white">Reset</button>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default Signin;