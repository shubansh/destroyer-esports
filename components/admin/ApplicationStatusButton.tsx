'use client'

import { updateApplicationStatus } from '@/actions/admin'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'

export function ApplicationStatusButton({ id, currentStatus }: { id: string, currentStatus: string }) {
    const [loading, setLoading] = useState(false)

    const handleUpdate = async (status: string) => {
        setLoading(true)
        try {
            await updateApplicationStatus(id, status)
        } catch (_e) {
            console.error(_e)
            alert('Failed to update status')
        }


        setLoading(false)
    }

    if (currentStatus === 'pending') {
        return (
            <>
                <Button size="sm" variant="outline" className="text-green-500 border-green-500 hover:bg-green-500/10" onClick={() => handleUpdate('accepted')} disabled={loading}>Accept</Button>
                <Button size="sm" variant="outline" className="text-red-500 border-red-500 hover:bg-red-500/10" onClick={() => handleUpdate('rejected')} disabled={loading}>Reject</Button>
            </>
        )
    }

    return (
        <Button size="sm" variant="ghost" onClick={() => handleUpdate('pending')} disabled={loading}>Reset</Button>
    )
}
