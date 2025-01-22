"use client";
import React, { /* useRef, */ useState, } from "react";
import { FcGoogle } from "react-icons/fc";
import { /* createUserWithEmailAndPassword, */ signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "@/utils/firebase";
import { doc, setDoc } from "@firebase/firestore"
import { useAuthStore } from "@/app/store";
import { toast } from 'react-toastify';




export function SignupForm() {
    const [noAcc/* , setnoAcc */] = useState(false);

    const currentOn = useAuthStore((state) => state.currentOn)
    // const emailRef = useRef<HTMLInputElement>(null);
    // const passwordRef = useRef<HTMLInputElement>(null);
    // console.log("hello", auth.currentUser?.email)

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     if (emailRef.current && passwordRef.current) {
    //         const userCredential = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
    //         const userId = userCredential.user.uid;
    //         const userImg = userCredential.user.photoURL;
    //         const userEmail = userCredential.user.email;
    //         const userName = userCredential.user.displayName;
    //         // console.log('User ID:', userId);
    //         currentOn(userId, userImg, userEmail, userName)
    //     }
    // };

    const handleGoogleSignIn = async () => {
        try {
            const userCredential = await signInWithPopup(auth, googleProvider)
            const userId = userCredential.user.uid;
            const userImg = userCredential.user.photoURL;
            const userEmail = userCredential.user.email;
            const userName = userCredential.user.displayName;
            const docref = doc(db, "Users", userId)
            await setDoc(docref, { name: userId }).then(() => {
                toast.success("Signed-in successfully");
            })
            currentOn(userId, userImg, userEmail, userName)
        } catch (error) {
            console.log("error", error);
        }

    };
    return (
        <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to Wikipok
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">

                {`${!noAcc ? "Create account" : "Login"} to add your own words and definitions.`}
            </p>

            {/* <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" ref={emailRef} placeholder="projectmayhem@fc.com" type="email" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" ref={passwordRef} placeholder="••••••••" type="password" />
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    {`${noAcc ? "Log in " : "Sign Up"}`}
                    <BottomGradient />
                </button>
            </form> */}
            {/* <div className="flex mt-5 justify-center">
                {
                    noAcc ?
                        <button
                            className="bg-gradient-to-br relative group/btn text-blue-700 dark:text-white "
                            onClick={() => (setnoAcc(false))}
                        >
                            <p className="hover:text-blue-600">

                                No account? Create now
                            </p>
                            <BottomGradient />
                        </button>
                        :
                        <button
                            className="bg-gradient-to-br relative group/btn text-blue-700 dark:text-white"
                            onClick={() => (setnoAcc(true))}
                        >
                            <p className="hover:text-blue-600">

                                Have account? Sign In now
                            </p>
                            <BottomGradient />
                        </button>
                }

            </div> */}

            <div className="bg-gradient-to-r from-transparent via-yellow-600 dark:via-yellow-600 to-transparent my-8 h-[1px] w-full" />
            <div className="flex flex-col space-y-4">
                <button
                    onClick={handleGoogleSignIn}
                    className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-400 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                >
                    <FcGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Google
                    </span>
                    <BottomGradient />
                </button>
            </div>

        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-yellow-300 dark:via-yellow-300 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};
