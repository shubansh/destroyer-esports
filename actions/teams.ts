'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function checkAdmin() {
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

export async function createTeam(formData: FormData) {
    await checkAdmin()
    const supabase = await createClient()

    const name = formData.get('name') as string
    const slug = formData.get('slug') as string
    const game = formData.get('game') as string
    const description = formData.get('description') as string
    const logo_url = formData.get('logo_url') as string

    if (!name || !slug || !game) {
        throw new Error("Missing required fields")
    }

    const { error } = await supabase.from('teams').insert({
        name,
        slug,
        game,
        description,
        logo_url,
    })

    if (error) throw error
    revalidatePath('/admin/teams')
    redirect('/admin/teams')
}

export async function deleteTeam(id: string) {
    await checkAdmin()
    const supabase = await createClient()
    const { error } = await supabase.from('teams').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/admin/teams')
}
