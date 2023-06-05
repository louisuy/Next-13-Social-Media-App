type PostCardProps = {
    id: string;
    createdAt: Date;
    content: string;
    authorId: string;
}

export function PostCard({ content, authorId }: PostCardProps) {
    return (
        <div
            className='bg-white/[0.1] rounded-lg p-4 shadow-md hover:shadow-xl m-4 transition duration-200'
        >
            {content}
        </div>
    )
}