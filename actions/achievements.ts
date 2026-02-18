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

export async function createAchievement(formData: FormData) {
    await checkContentAdmin()
    const supabase = await createClient()

    const title = formData.get('title') as string
    const event_name = formData.get('event_name') as string
    const placement = formData.get('placement') as string
    const prize_pool = formData.get('prize_pool') as string
    const date = formData.get('date') as string
    // Handling team_id might require a select dropdown or generic assignment

    const { error } = await supabase.from('achievements').insert({
        title,
        event_name,
        placement,
        prize_pool,
        date
    })

    if (error) throw error
    revalidatePath('/admin/achievements')
    redirect('/admin/achievements')
}

export async function deleteAchievement(id: string) {
    await checkContentAdmin()
    const supabase = await createClient()
    const { error } = await supabase.from('achievements').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/admin/achievements')
}
