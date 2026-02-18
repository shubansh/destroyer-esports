import { createClient } from '@/utils/supabase/server'
import { GlassCard } from '@/components/ui/GlassCard'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, Globe } from 'lucide-react'
import { deletePost } from '@/actions/blog'

export const revalidate = 0

export default async function BlogAdminPage() {
    const supabase = await createClient()
    const { data: posts } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Blog / News</h1>
                <Link href="/admin/blog/create">
                    <Button variant="neon" size="sm" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" /> New Post
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {posts?.map((post) => (
                    <GlassCard key={post.id} className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold">{post.title}</h3>
                            <p className="text-gray-400 text-sm">{post.slug}</p>
                            <div className="flex gap-2 mt-1">
                                {post.published && <span className="text-green-500 text-xs px-2 py-0.5 bg-green-500/10 rounded">Published</span>}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Link href={`/blog/${post.slug}`} target="_blank">
                                <Button variant="ghost" size="sm">
                                    <Globe className="w-4 h-4" />
                                </Button>
                            </Link>
                            <form action={deletePost.bind(null, post.id)}>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </GlassCard>
                ))}
                {(!posts || posts.length === 0) && (
                    <div className="text-center text-gray-500">No posts found.</div>
                )}
            </div>
        </div>
    )
}
