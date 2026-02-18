'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

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

export async function updateApplicationStatus(id: string, status: string) {
    await checkAdmin()
    const supabase = await createClient()
    const { error } = await supabase.from('applications').update({ status }).eq('id', id)
    if (error) throw error
    revalidatePath('/admin/applications')
}

export async function updateContactStatus(id: string, status: string) {
    await checkAdmin()
    const supabase = await createClient()
    const { error } = await supabase.from('contact_messages').update({ status }).eq('id', id)
    if (error) throw error
    revalidatePath('/admin/contact')
}

// More actions will be added for Teams CRUD
