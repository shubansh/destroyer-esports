'use client'

import { toggleFlag } from '@/actions/flags'
import { useState } from 'react'

export function FlagToggle({ id, isEnabled }: { id: string, isEnabled: boolean }) {
    const [loading, setLoading] = useState(false)

    const handleToggle = async () => {
        setLoading(true)
        try {
            await toggleFlag(id, !isEnabled)
        } catch (_e) {
            console.error(_e)
            alert('Failed to update flag')
        }


        setLoading(false)
    }

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${isEnabled ? 'bg-primary' : 'bg-gray-700'}`}
        >
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
        </button>
    )
}
