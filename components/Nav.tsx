// "use client";

import Link from "next/link";
import {
    SignInButton,
    SignUpButton,
    SignedOut,
    SignedIn,
    UserButton,
    currentUser
} from "@clerk/nextjs";

const Nav = async () => {
    // const { signOut } = useClerk();
    const user = await currentUser();
    return (
        <nav className="">
            <div className="flex items-center justify-between p-5 bg-[#FEFEFE] border-b-2 border-[#353535]">
                <Link href='/' className='text-2xl font-bold'>
                    Feed!
                </Link>

                <div className="flex items-center gap-2 ">
                    <SignedIn>
                        <Link href={"/new"}>
                            <button className='bg-[#353535] text-white w-9 h-9 rounded-full'>
                                +
                            </button>
                        </Link>
                        {/* <div className="border-2 rounded-full border-[#353535]"> */}
                        {/* <div className="flex items-center"> */}
                        {/* <Link
                                    href={`/u/${user?.username}`}
                                    className="flex flex-col px-3 font-bold"
                                >
                                    <p>
                                        {user?.firstName}
                                    </p>
                                </Link> */}
                        <div className="border-2 rounded-full border-[#353535]">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                        {/* </div> */}
                        {/* </div> */}
                        {/* <div>
                            <p className="text-2xl font-bold">
                                {user?.firstName}
                            </p>
                        </div> */}
                    </SignedIn>
                </div>

                <SignedOut>
                    <div className="flex items-center gap-2">
                        <SignInButton mode="modal">
                            <button className="px-2 rounded-full border-2 border-[#353535] text-[#FEFEFE] bg-[#353535] hover:bg-[#FEFEFE] hover:text-[#353535]">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="px-2 rounded-full border-2 border-[#353535] hover:text-[#FEFEFE] hover:bg-[#353535]">
                                Sign up
                            </button>
                        </SignUpButton>
                    </div>
                </SignedOut>

            </div>
        </nav>
    );
};

export default Nav;