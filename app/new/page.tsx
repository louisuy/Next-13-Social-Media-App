import { redirect } from "next/navigation";
import { prisma } from "@/db";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from '@clerk/nextjs';

async function createPost(data: FormData) {
    "use server";

    const content = data.get('content')?.valueOf()
    if (typeof content !== "string" || content?.length === 0) {
        throw new Error('Content is required');
    };

    const userId = data.get("user")?.valueOf();
    if (typeof userId !== "string") {
        throw new Error("User ID is missing or invalid");
    }

    await prisma.post.create({
        data: {
            content: content,
            authorId: userId
        }
    })

    redirect('/')
}

export default async function New() {
    const user = await currentUser();
    // console.log(user)
    return (
        <div
            className='bg-white/[0.1] rounded-lg p-4 shadow-md focus-within:shadow-xl m-4 transition duration-200'
        >
            <form action={createPost}>
                <div className="flex gap-4">
                    <Image
                        src={user?.imageUrl}
                        alt={user?.firstName}
                        width={50}
                        height={50}
                        className="rounded-full"
                    />
                    <input type="hidden" name="user" value={user?.id} />
                    <input
                        type="text"
                        name="content"
                        className="w-full outline-none bg-white/[0] pb-3"
                        placeholder={`What's on your mind, ${user?.firstName}?`}
                    />
                </div>

                <div className="items-center">
                    <div className="flex gap-3 justify-end">
                        <Link href='..'>
                            <button className='btn w-min h-min'>
                                Cancel
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className='btn btn-primary w-min h-min'
                        >
                            Post
                        </button>
                    </div >
                </div>
            </form >
        </div >
    )
}