'use client'

import { createPost } from '@/actions/blog'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'

export default function CreateBlogPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Create New Post</h1>
            <GlassCard className="p-8">
                <form action={createPost} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input name="title" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug</label>
                        <input name="slug" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" placeholder="my-new-post" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Excerpt</label>
                        <textarea name="excerpt" rows={2} className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cover Image URL</label>
                        <input name="cover_image" className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Content</label>
                        <textarea name="content" rows={12} required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors font-mono" placeholder="Markdown supported..." />
                    </div>

                    <Button type="submit" variant="neon" className="w-full">
                        Publish Post
                    </Button>
                </form>
            </GlassCard>
        </div>
    )
}
