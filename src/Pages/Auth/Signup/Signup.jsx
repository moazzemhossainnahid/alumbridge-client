import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { sendEmailVerification } from 'firebase/auth';
import Loading from '../../../Components/Others/Loading/Loading';

const Signup = () => {
    const [createUserWithEmailAndPassword, cuser, cloading, cerror] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const { register, handleSubmit, reset } = useForm();
    const [selectType, setSelectType] = useState();
    const navigate = useNavigate();

    let signupError;


    if (cloading) {
        return <Loading />
    };


    if (cerror) {
        signupError = <p className="text-red-700">{cerror?.message}</p>
    };



    const handleSignupform = async (data) => {

        const displayName = data.name;
        const email = data.email;
        const password = data.password;
        const accType = selectType;
        await createUserWithEmailAndPassword(email, password)
        verifyEmail()
        await updateProfile({ displayName: displayName })
            .then(() => {
                if (email) {
                    fetch(`http://localhost:5000/api/v1/users/${email}`, {
                        method: 'PUT',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ email, displayName, accType })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log("data", data);
                        })
                }
                reset();
            })
    }


    // const handleGoogleSignin = async () => {
    //   await signInWithGoogle()
    // }


    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                navigate("/signin");
                toast.success('Verification Email Sent Successfully');
            })
    };

    const handleType = (e) => {
        const type = e.target.value;

        setSelectType(type);
    };


    return (
        <div className="h-full bg-white w-full px-4">
            <div className="flex flex-col items-center justify-center">
                <div className="bg-white rounded md:w-2/3 w-full p-10">
                    {/* <div className="w-full mx-auto py-7">
                        <img src="https://i.ibb.co/7VySsQR/logo.png" alt="" className="w-52 mx-auto" />
                    </div> */}
                    <p tabIndex={0} role="heading" aria-label="Login to your account" className="text-2xl text-center font-semibold tracking-widest leading-6 text-gray-800">
                        Account Sign Up
                    </p>
                    <p className="text-sm text-center mt-10 font-medium leading-none text-gray-500">
                        Sign up to your account to access your profile, history, and any private pages you've been granted access to.
                    </p>
                    <form
                        onSubmit={handleSubmit(handleSignupform)}
                        action=""
                        className="py-3 space-y-3"
                    >
                        <div className="space-y-12 w-full h-full mt-10 py-7">
                            <div className="relative z-0 my-2">
                                <input {...register("name")} type="text" required placeholder="Enter Your Name" className="input input-bordered input-dark w-full" />
                            </div>
                            <div className="relative z-0 my-2">
                                <input {...register("email")} type="text" required placeholder="Enter Your Email" className="input input-bordered input-dark w-full" />
                            </div>
                            <div className="relative z-0 my-2">
                                <input {...register("password")} type="password" required placeholder="Enter Your Password" className="input input-bordered input-dark w-full" />
                            </div>

                            <div className="relative z-0 my-2">
                                <select
                                    onChange={handleType}
                                    className="input input-bordered input-dark w-full"
                                >
                                    <option disabled selected>
                                        Select Type
                                    </option>
                                    <option value="Alumni">Alumni</option>
                                    <option value="Student">Student</option>
                                </select>

                            </div>
                        </div>
                        {signupError}
                        <div className="mt-8">
                            <button type='submit' role="button" aria-label="create my account" className="bg-gray-900 hover:bg-gray-700 btn btn-lg rounded-full font-semibold w-40 mx-auto text-white capitalize flex justify-center">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <div className="py-7 text-center">
                        <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                            Already have an account?{" "}
                            <span onClick={() => navigate("/signin")} tabIndex={0} role="link" aria-label="Sign up here" className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer">
                                {" "}
                                Please Sign in
                            </span>
                        </p>
                    </div>


                </div>
            </div>
        </div >
    );
};

export default Signup;