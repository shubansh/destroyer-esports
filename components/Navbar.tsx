'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/Button'
import { Menu, X, ChevronRight, User as UserIcon } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { User } from '@supabase/supabase-js'

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [scrolled, setScrolled] = useState(false)
    const supabase = createClient()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)
            router.refresh()
        })

        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => {
            subscription.unsubscribe()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [supabase, router])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    const navLinks = [
        { name: 'Teams', href: '/teams' },
        { name: 'Achievements', href: '/achievements' },
        { name: 'Intel', href: '/blog' },
        { name: 'Join Ranks', href: '/join' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
                        ? 'bg-black/80 backdrop-blur-xl border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
                        : 'bg-transparent border-transparent py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative group z-50">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-sm skew-x-[-10deg] flex items-center justify-center shadow-[0_0_15px_rgba(0,191,255,0.5)] group-hover:shadow-[0_0_25px_rgba(0,191,255,0.8)] transition-all duration-300">
                                <span className="font-display font-bold text-black text-xl skew-x-[10deg]">D</span>
                            </div>
                            <span className="font-display font-bold text-2xl tracking-wider text-white group-hover:text-primary transition-colors duration-300">
                                DSTR
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-primary ${isActive ? 'text-primary' : 'text-gray-400'
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-primary transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link href="/dashboard">
                                    <Button variant="ghost" className="border-white/10 hover:border-primary/50 text-xs">
                                        <UserIcon className="w-4 h-4 mr-2" />
                                        Command Center
                                    </Button>
                                </Link>
                                <Button onClick={handleSignOut} variant="outline" className="text-xs border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500">
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <Link href="/login">
                                <Button variant="neon" className="px-8 py-2 text-xs font-bold skew-x-[-10deg]">
                                    <span className="skew-x-[10deg]">ACCESS TERMINAL</span>
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl transition-transform duration-500 ease-in-out md:hidden flex flex-col items-center justify-center space-y-8 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {navLinks.map((link, idx) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl font-display font-bold text-white hover:text-primary hover:scale-105 transition-all duration-300 flex items-center gap-4 group"
                        style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                        <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity -ml-8"><ChevronRight /></span>
                        {link.name}
                    </Link>
                ))}

                <div className="mt-12 w-full max-w-xs space-y-4 px-6">
                    {user ? (
                        <>
                            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                <Button className="w-full py-6 text-lg bg-white/5 border border-white/10 hover:border-primary">
                                    Command Center
                                </Button>
                            </Link>
                            <Button onClick={() => { handleSignOut(); setIsOpen(false) }} className="w-full py-6 text-lg text-red-500 border border-red-900/30 bg-red-900/10 hover:bg-red-900/20">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button variant="neon" className="w-full py-6 text-lg">
                                ACCESS TERMINAL
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}
