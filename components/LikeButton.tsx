import { prisma } from '@/db';
import { redirect } from 'next/navigation';

async function likePost(data: FormData) {
    'use server'
    const postId = data.get('id')?.valueOf();
    if (typeof postId !== 'string') {
        throw new Error('Post ID is missing or invalid');
    }
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })
    const currentLikes = post?.likes;
    const likes = currentLikes !== undefined ? currentLikes + 1 : 0;
    await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            likes: likes,
        }
    });
    redirect('/');
}

type LikeButtonProps = {
    id: string;
}

export default async function LikeButton({ id }: LikeButtonProps) {
    return (
        <form action={likePost}>
            <input type='hidden' name='id' value={id} />
            <button type='submit'>
                &#129293;
            </button>
        </form>
    )
}