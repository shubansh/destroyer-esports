'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function checkContentAdmin() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!profile || !['super_admin', 'content_admin'].includes(profile.role)) {
        throw new Error("Forbidden")
    }
}

export async function createPost(formData: FormData) {
    await checkContentAdmin()
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const content = formData.get('content') as string
    const excerpt = formData.get('excerpt') as string
    const cover_image = formData.get('cover_image') as string

    const { error } = await supabase.from('blog_posts').insert({
        title,
        slug,
        content,
        excerpt,
        cover_image,
        author_id: user?.id,
        published: true, // Auto-publish for simplicity for now
        published_at: new Date().toISOString()
    })

    if (error) throw error
    revalidatePath('/admin/blog')
    redirect('/admin/blog')
}

export async function deletePost(id: string) {
    await checkContentAdmin()
    const supabase = await createClient()
    const { error } = await supabase.from('blog_posts').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/admin/blog')
}
