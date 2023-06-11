import { prisma } from '@/db';
import { redirect } from 'next/navigation';

async function deletePost(data: FormData) {
    'use server'
    const postId = data.get('id')?.valueOf();
    if (typeof postId !== 'string') {
        throw new Error('Post ID is missing or invalid');
    }
    console.log('deletePost', postId);
    await prisma.post.delete({
        where: {
            id: postId,
        },
    });
    redirect('/');
}

type DeleteButtonProps = {
    id: string;
}

export default async function DeleteButton({ id }: DeleteButtonProps) {
    return (
        <form action={deletePost}>
            <input type='hidden' name='id' value={id} />
            <button type='submit'>
                &#128465;
            </button>
        </form>
    )
}