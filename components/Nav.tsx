// "use client";

import Link from "next/link";
import {
    SignInButton,
    SignUpButton,
    SignedOut,
    SignedIn,
    UserButton,
    useClerk
} from "@clerk/nextjs";

const Nav = () => {
    // const { signOut } = useClerk();
    return (
        <nav className="">
            <div className="flex justify-between p-5 pb-0">
                <Link href='/' className='text-2xl font-bold'>
                    Clerk App
                </Link>

                <div className="flex items-center gap-2 ">
                    <SignedIn>
                        <Link href={"/new"}>
                            <button className='bg-gray-900 text-white w-8 h-8 rounded-full'>
                                +
                            </button>
                        </Link>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </div>

                <SignedOut>
                    <div className="drawer drawer-end w-min md:hidden">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">&#9776;</label>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                            <ul className="menu gap-4 p-4 h-full bg-base-200 text-base-content">
                                <SignInButton mode="modal">
                                    <button className="btn btn-primary">
                                        Sign In
                                    </button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className="btn">
                                        Sign up
                                    </button>
                                </SignUpButton>
                            </ul>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <SignInButton mode="modal">
                            <button className="btn btn-primary">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="btn">
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