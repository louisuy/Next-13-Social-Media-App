import Image from 'next/image'
import { prisma } from '@/db'
import { PostCard } from '@/components/PostCard'
import { SignedIn } from '@clerk/nextjs'

function getPosts() {
  return prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export default async function Home() {
  const posts = await getPosts()
  // await prisma.post.create({
  //   data: {
  //     content: 'Test Post',
  //     authorId: '1'
  //   }
  // })
  return (
    <main>
      <div className=''>
        <h1 className="text-xl p-4 pb-0 font-bold">Home</h1>
        {posts.map(post => (
          <PostCard
            key={post.id}
            content={post.content}
            authorId={post.authorId}
            id={post.id}
            createdAt={post.createdAt}
          // likes={post.likes}
          />
        ))}
      </div>
    </main>
  )
}
