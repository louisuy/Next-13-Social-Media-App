import { PostCard } from "@/components/PostCard";
import { prisma } from "@/db";
import { clerkClient, currentUser } from "@clerk/nextjs";
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
    const user = await clerkClient.users.getUser(params.slug);
    const posts = await getPosts(user?.id || '');
    const current = await currentUser();
    const isCurrentUser = current?.id === user?.id;
    // const feedTitle = isCurrentUser ? 'Your Feed' : `${user?.firstName}'s Feed`;
    // console.log(params.slug);
    return (
        <div className="">
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
                {/* <h1 className="font-bold">{feedTitle}</h1> */}
                <div className="flex flex-col">
                    <Link href={`/u/${user?.id}`} className="font-bold">{user?.firstName} {user?.lastName}</Link>
                    <h2>@{user?.username}</h2>
                </div>
            </div>

            {posts.map(post => (
                <PostCard
                    key={post.id}
                    content={post.content}
                    authorId={post.authorId}
                    id={post.id}
                    createdAt={post.createdAt}
                    likes={post.likes}
                />
            ))}
        </div>
    );
}