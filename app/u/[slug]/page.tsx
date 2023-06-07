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
                <div className="flex items-center">
                    <div className="pl-3">
                        <Image
                            src={user?.imageUrl}
                            alt={user?.username || ''}
                            width={50}
                            height={50}
                            className="rounded-full m-4"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Link href={`/u/${user?.id}`} className="font-bold">{user?.firstName} {user?.lastName}</Link>
                        <h2>@{user?.username}</h2>
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
                        // likes={post.likes}
                        />
                    ))
                }

            </>
        );
    } else {
        redirect('/');
    }

}