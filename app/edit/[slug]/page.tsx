import { redirect } from "next/navigation";
import { prisma } from "@/db";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from '@clerk/nextjs';
import Uploader from "@/components/Uploader";

async function editPost(data: FormData) {
    "use server";

    const content = data.get('content')?.valueOf()
    if (typeof content !== "string" || content?.length === 0) {
        throw new Error('Content is required');
    };

    const userId = data.get("user")?.valueOf();
    if (typeof userId !== "string") {
        throw new Error("User ID is missing or invalid");
    }

    const postId = data.get('id')?.valueOf();
    if (typeof postId !== 'string') {
        throw new Error('Post ID is missing or invalid');
    }

    await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            content: content,
            authorId: userId
        }
    })

    redirect('/')
}

export default async function Edit({
    params,
}: {
    params: { slug: string };
}) {
    const user = await currentUser();
    const postId = params.slug;
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    const content = post?.content;
    console.log(content)
    return (
        <div>
            <h1 className="text-xl p-4 pb-0 font-bold">Editing a post!</h1>
            <div
                className='rounded-xl m-4 border-2 border-[#353535]'
            >

                <form action={editPost}>
                    <div className="flex flex-col p-4 ">
                        <div className="flex gap-4">
                            <input type='hidden' name='id' value={postId} />
                            <input type="hidden" name="user" value={user?.id} />
                            <input
                                type="text"
                                name="content"
                                className="w-full outline-none bg-white/[0] pb-3"
                                defaultValue={content}
                                autoComplete="off"
                            />
                        </div>
                        {/* <Uploader /> */}
                    </div>

                    <div className="items-center bg-[#FEFEFE] border-t-2 border-[#353535] rounded-b-xl">
                        <div className="flex justify-between p-4">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={user?.imageUrl || ''}
                                    alt={user?.username || ''}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                <div>
                                    <Link
                                        href={`/u/${user?.username}`}
                                        className="flex flex-col"
                                    >
                                        <p className="font-bold -m-1">
                                            {user?.firstName}
                                        </p>
                                        <p className="-m-1">
                                            @{user?.username}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Link href='..'>
                                    <button className="px-2 rounded-full border-2 border-[#353535] hover:text-[#FEFEFE] hover:bg-[#353535]">
                                        Cancel
                                    </button>
                                </Link>
                                <button
                                    type="submit"
                                    className="px-2 rounded-full border-2 border-[#353535] text-[#FEFEFE] bg-[#353535] hover:bg-[#FEFEFE] hover:text-[#353535] h-min"
                                >
                                    Post
                                </button>
                            </div>
                        </div >
                    </div>
                </form >
            </div >
        </div>
    )
}