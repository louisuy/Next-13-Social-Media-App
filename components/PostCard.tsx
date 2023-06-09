import { clerkClient, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

type PostCardProps = {
    id: string;
    createdAt: Date;
    content: string;
    authorId: string;
    likes: number;
}

export async function PostCard({ content, authorId, id, likes }: PostCardProps) {
    const user = await clerkClient.users.getUser(authorId);
    const current = await currentUser();
    return (
        //<div className='bg-white/[0.1] flex gap-4 rounded-lg p-4 shadow-md hover:shadow-xl m-4 transition duration-200'>
        <div className="border-2 border-[#353535] flex gap-4 m-4 rounded-xl hover:scale-[100.5%] transition duration-200">
            <div className="flex flex-col w-full">
                <div className="p-4">
                    <p>{content}</p>
                </div>
                <div className="flex justify-between gap-4 items-center  bg-[#FEFEFE] border-t-2 border-[#353535] rounded-b-xl p-4">
                    <div className="flex items-center gap-4">
                        <Image
                            src={user?.imageUrl}
                            alt={user?.username || ''}
                            width={32}
                            height={32}
                            className="rounded-full border-2 border-[#353535]"
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
                    <div className="flex gap-4">
                        {current?.id === authorId && (
                            <>
                                <Link href={`/edit/${id}`}>
                                    <button>
                                        &#128221;
                                    </button>
                                </Link>
                                <DeleteButton id={id} />
                            </>
                        )}
                        <LikeButton id={id} />
                        <p className="text-black">{likes}</p>
                    </div>
                </div>
            </div>
        </div >
    )
}