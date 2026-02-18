import { GlassCard } from '@/components/ui/GlassCard'

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-display font-bold">About <span className="text-primary neon-text">DSTR</span></h1>
                    <p className="text-xl text-gray-300">Forging the future of Indian Esports.</p>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    {/* Placeholder Image */}
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-600">
                        [Team Photo Placeholder]
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <GlassCard className="p-8 space-y-4">
                        <h2 className="text-2xl font-bold text-primary">Our Mission</h2>
                        <p className="text-gray-300 leading-relaxed">
                            To create a sustainable ecosystem for aspiring esports athletes in India, providing them with world-class infrastructure, coaching, and opportunities to compete at the highest level. We aim to put India on the global esports map.
                        </p>
                    </GlassCard>
                    <GlassCard className="p-8 space-y-4">
                        <h2 className="text-2xl font-bold text-primary">Our Vision</h2>
                        <p className="text-gray-300 leading-relaxed">
                            We envision a future where esports is recognized as a premier sport in India, and Destroyer Esports stands as the beacon of excellence, integrity, and dominance in the global arena.
                        </p>
                    </GlassCard>
                </div>

                <div className="space-y-6">
                    <h2 className="text-3xl font-bold font-display">History</h2>
                    <div className="border-l-2 border-primary/30 pl-8 space-y-8">
                        <div className="relative">
                            <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-primary shadow-[0_0_10px_#00BFFF]"></div>
                            <h3 className="text-xl font-bold text-white">2024</h3>
                            <p className="text-gray-400">Founded with a vision to revolutionize Indian Esports. Initial rosters acquired for BGMI and Valorant.</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-gray-700"></div>
                            <h3 className="text-xl font-bold text-gray-500">2025</h3>
                            <p className="text-gray-500">Projected: Expansion into mobile MOBAs and international tournament debut.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
