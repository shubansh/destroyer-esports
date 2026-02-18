'use client'

import { updateContactStatus } from '@/actions/admin'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export function ContactStatusButton({ id, currentStatus }: { id: string, currentStatus: string }) {
    const [loading, setLoading] = useState(false)

    const handleUpdate = async (status: string) => {
        setLoading(true)
        try {
            await updateContactStatus(id, status)
        } catch (_e) {
            console.error(_e)
            alert('Failed to update status')
        }


        setLoading(false)
    }

    return (
        <div className="flex gap-2">
            {currentStatus === 'new' && (
                <Button size="sm" variant="outline" onClick={() => handleUpdate('replied')} disabled={loading}>Mark Replied</Button>
            )}
            {currentStatus !== 'closed' && (
                <Button size="sm" variant="ghost" className="text-gray-500 hover:text-white" onClick={() => handleUpdate('closed')} disabled={loading}>Close</Button>
            )}
        </div>
    )
}
