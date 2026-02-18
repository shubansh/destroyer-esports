import Link from 'next/link'
import { Twitter, Instagram, Youtube, ChevronRight } from 'lucide-react'



export function Footer() {
    return (
        <footer className="bg-[#020202] border-t border-white/5 py-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-sm skew-x-[-10deg] flex items-center justify-center">
                                <span className="font-display font-bold text-black text-lg skew-x-[10deg]">D</span>
                            </div>
                            <span className="font-display font-bold text-xl tracking-wider text-white">
                                DSTR
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Forging legends in the digital arena. Destroyer Esports is India&apos;s premier organization dedicated to competitive excellence.
                        </p>

                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:shadow-[0_0_15px_rgba(0,191,255,0.5)] transition-all duration-300">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:shadow-[0_0_15px_rgba(0,191,255,0.5)] transition-all duration-300">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary hover:shadow-[0_0_15px_rgba(0,191,255,0.5)] transition-all duration-300">
                                <Youtube className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-display font-bold text-white mb-6 uppercase tracking-widest text-sm">Organization</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="/teams" className="hover:text-primary transition-colors">Rosters</Link></li>
                            <li><Link href="/achievements" className="hover:text-primary transition-colors">Trophy Case</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                            <li><Link href="/staff" className="hover:text-primary transition-colors">Staff</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display font-bold text-white mb-6 uppercase tracking-widest text-sm">Resources</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link href="/blog" className="hover:text-primary transition-colors">Intel / News</Link></li>
                            <li><Link href="/join" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
                            <li><Link href="/brand-assets" className="hover:text-primary transition-colors">Brand Assets</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display font-bold text-white mb-6 uppercase tracking-widest text-sm">Newsletter</h4>
                        <p className="text-gray-500 text-sm mb-4">Stay ahead of the game with our weekly briefing.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Enter email" className="bg-white/5 border border-white/10 px-4 py-2 text-sm text-white rounded-sm w-full focus:outline-none focus:border-primary transition-colors" />
                            <button className="bg-primary hover:bg-primary-hover text-black px-4 py-2 rounded-sm font-bold transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono uppercase tracking-wider">
                    <p>&copy; {new Date().getFullYear()} Destroyer Esports.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

