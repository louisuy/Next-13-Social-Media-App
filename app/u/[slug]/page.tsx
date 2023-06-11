import { PostCard } from "@/components/PostCard";
import { prisma } from "@/db";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

function getPosts(user: string) {
    return prisma.post.findMany({
        where: {
            authorId: user,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })
}

export default async function Page({
    params,
}: {
    params: { slug: string };
}) {
    const userList = await clerkClient.users.getUserList({
        limit: 1,
        username: [`${params.slug}`]
    })
    const user = userList[0];
    const posts = await getPosts(user?.id || '');
    const current = await currentUser();
    const isCurrentUser = current?.id === user?.id;


    if (user !== undefined) {
        return (
            <>
                <div className="flex gap-4 m-4">
                    <Image
                        src={user?.imageUrl}
                        alt={user?.username || ''}
                        width={50}
                        height={50}
                        className="rounded-full border-2 border-[#353535] bg-[#353535]"
                    />
                    <div className="flex flex-col">
                        <Link href={`/u/${user?.id}`} className="font-bold text-xl">{user?.firstName} {user?.lastName}</Link>
                        <div>
                            <h2 className="-my-2">@{user?.username}</h2>
                        </div>
                    </div>
                </div>
                {
                    posts.map(post => (
                        <PostCard
                            key={post.id}
                            content={post.content}
                            authorId={post.authorId}
                            id={post.id}
                            createdAt={post.createdAt}
                            likes={post.likes}
                        />
                    ))
                }

            </>
        );
    } else {
        redirect('/');
    }

}