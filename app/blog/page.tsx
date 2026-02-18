import { createClient } from '@/utils/supabase/server'
import { GlassCard } from '@/components/ui/GlassCard'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60

export default async function BlogPage() {
    const supabase = await createClient()
    const { data: posts } = await supabase
        .from('blog_posts')
        .select('*, profiles(full_name)')
        .eq('published', true)
        .order('published_at', { ascending: false })

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-5xl font-display font-bold text-center mb-12">
                Intel <span className="text-primary neon-text">Feed</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts?.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
                        <GlassCard hoverEffect className="h-full flex flex-col p-0 overflow-hidden">
                            <div className="relative aspect-video bg-gray-800">
                                {post.cover_image ? (
                                    <Image src={post.cover_image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gray-900 border-b border-white/5">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-grow space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-xs text-primary font-mono uppercase">
                                        <span>{new Date(post.published_at!).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{post.tags?.[0] || 'News'}</span>
                                    </div>
                                    <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                                    <p className="text-gray-400 text-sm line-clamp-3">{post.excerpt}</p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-white/5 text-xs text-gray-500">
                                    By {post.profiles?.full_name || 'Admin'}
                                </div>
                            </div>
                        </GlassCard>
                    </Link>
                ))}
                {(!posts || posts.length === 0) && (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        No intel reports available.
                    </div>
                )}
            </div>
        </div>
    )
}
