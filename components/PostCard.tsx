import { clerkClient, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

type PostCardProps = {
    id: string;
    createdAt: Date;
    content: string;
    authorId: string;
    // likes: number;
}

export async function PostCard({ content, authorId }: PostCardProps) {
    const user = await clerkClient.users.getUser(authorId);
    const current = await currentUser();
    return (
        <div
            className='bg-white/[0.1] flex gap-4 rounded-lg p-4 shadow-md hover:shadow-xl m-4 transition duration-200'
        >
            <div>
                <Image
                    src={user?.imageUrl}
                    alt={user?.username || ''}
                    width={32}
                    height={32}
                    className="rounded-full"
                />
            </div>
            <div className="flex flex-col w-full">
                <div>
                    <Link
                        href={`/u/${user?.username}`}
                        className="font-bold"
                    >
                        {user?.firstName}
                    </Link>
                    <p>{content}</p>
                </div>
                <div className="flex justify-end gap-4">
                    <button className=''>
                        &#129293;
                    </button>
                    {/* <p className="text-black">{likes}</p> */}
                    {current?.id === authorId && (
                        <>
                            <button className=''>
                                &#128221;
                            </button>
                            <button className=''>
                                &#128465;
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div >
    )
}