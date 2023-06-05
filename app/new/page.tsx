import { redirect } from "next/navigation";
import { prisma } from "@/db";
import Link from "next/link";

async function createPost(data: FormData) {
    "use server";

    const content = data.get('content')?.valueOf()
    if (typeof content !== "string" || content?.length === 0) {
        throw new Error('Content is required');
    };

    await prisma.post.create({
        data: {
            content: content,
            authorId: 'testuser'
        }
    })

    redirect('/')
}

export default function New() {
    return (
        <div
            className='bg-white/[0.1] rounded-lg p-4 shadow-md focus-within:shadow-xl m-4 transition duration-200'
        >
            <form action={createPost}>
                <input
                    type="text"
                    name="content"
                    className="w-full outline-none bg-white/[0] pb-3"
                    placeholder="What's on your mind?"
                />
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
            </form >
        </div >
    )
}