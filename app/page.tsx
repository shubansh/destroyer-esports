import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight, Trophy, Users, Globe, ChevronRight } from 'lucide-react'

// Forces shift in line numbers
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">


      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20 scale-105 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,191,255,0.08)_0%,transparent_70%)]"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8 mt-[-5vh]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-primary/20 backdrop-blur-md animate-fade-in mx-auto">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-mono text-primary tracking-widest uppercase">Accepting New Applications</span>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold uppercase tracking-tighter leading-none animate-slide-up bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 drop-shadow-2xl">
              For the <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-white neon-text">
                Glory
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed tracking-wide animate-fade-in delay-100">
            India&apos;s Elite Esports Organization. Dominate the server, secure the legacy.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-fade-in delay-200">
            <Link href="/join">
              <Button variant="neon" className="h-14 px-10 text-lg rounded-sm skew-x-[-10deg] group transition-all duration-300 hover:scale-105">
                <span className="skew-x-[10deg] flex items-center gap-2">
                  Start Your Legacy <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </Link>
            <Link href="/teams">
              <Button className="h-14 px-10 text-lg bg-transparent border border-white/20 hover:bg-white/5 backdrop-blur-md rounded-sm skew-x-[-10deg] group">
                <span className="skew-x-[10deg] text-white">View Roster</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20"></div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] font-mono tracking-widest text-primary uppercase">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 px-4 relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-8 text-center group hover:bg-primary/5 transition-colors">
            <Trophy className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(0,191,255,0.5)]" />
            <div className="text-5xl font-display font-bold text-white mb-2">25+</div>
            <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Championship Titles</div>
          </div>
          <div className="glass-panel p-8 text-center group hover:bg-primary/5 transition-colors">
            <Users className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(0,191,255,0.5)]" />
            <div className="text-5xl font-display font-bold text-white mb-2">50+</div>
            <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Pro Athletes</div>
          </div>
          <div className="glass-panel p-8 text-center group hover:bg-primary/5 transition-colors">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(0,191,255,0.5)]" />
            <div className="text-5xl font-display font-bold text-white mb-2">100k+</div>
            <div className="text-xs font-mono uppercase tracking-widest text-gray-400">Global Community</div>
          </div>
        </div>
      </section>

      {/* LATEST INTEL */}
      <section className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-12 h-[2px] bg-primary"></span>
                <span className="text-primary font-mono text-xs tracking-widest uppercase">Briefing Room</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase">Latest <span className="text-primary-dim text-stroke-primary">Intel</span></h2>
            </div>
            <Link href="/blog" className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
              View All News <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[16/9] bg-gray-900 overflow-hidden rounded-sm mb-6 border border-white/5 group-hover:border-primary/50 transition-colors duration-500">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors duration-500 z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-20 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <div className="absolute top-4 left-4 z-30 bg-primary text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                    Official
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-xs font-mono text-primary/80">FEB 18, 2026</div>
                  <h3 className="text-xl font-bold font-display text-white leading-tight group-hover:text-primary transition-colors">Recruitment Open for BGMI Roster 2026 Season</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">We are scouting for the next generation of champions to represent Destroyer Esports on the global stage.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop')] bg-cover bg-center opacity-5 mix-blend-overlay grayscale"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-8">
          <h2 className="text-5xl md:text-8xl font-display font-bold uppercase leading-none">
            Ready to make <br /> <span className="text-primary neon-text">History?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Join the ranks of the elite. Whether you play, create, or support, there is a place for you.</p>
          <Link href="/join">
            <Button variant="neon" className="h-16 px-16 text-xl mt-8 rounded-sm">
              Apply Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
