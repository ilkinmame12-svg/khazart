'use client'
import { useState, useEffect, useCallback } from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
  { id:1, img:'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&q=85', artist:'Elena Vasquez', title:'Golden Hour', info:'Oil on canvas · 120 × 90 cm · 2024', price:'$4,800' },
  { id:2, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85', artist:'Arash Moradiani', title:'Blue Silence', info:'Acrylic · 100 × 80 cm · 2023', price:'$3,200' },
  { id:3, img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1600&q=85', artist:'Karim Al-Rashid', title:'Desert Memory', info:'Mixed media · 100 × 100 cm · 2023', price:'$6,500' },
  { id:4, img:'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1600&q=85', artist:'Nadia Petrov', title:'Soft Geometry', info:'Watercolor · 80 × 60 cm · 2024', price:'$1,900' },
]

export default function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('home')
  const [cur, setCur] = useState(0)
  const [fading, setFading] = useState(false)

  const go = useCallback((n: number) => {
    setFading(true)
    setTimeout(() => { setCur(n); setFading(false) }, 400)
  }, [])

  const next = useCallback(() => go((cur + 1) % SLIDES.length), [cur, go])
  const prev = useCallback(() => go((cur - 1 + SLIDES.length) % SLIDES.length), [cur, go])

  useEffect(() => {
    const id = setInterval(next, 5500)
    return () => clearInterval(id)
  }, [next])

  const s = SLIDES[cur]

  return (
    <section style={{ position:'relative', height:'calc(100vh - 64px)', minHeight:560, overflow:'hidden', background:'#0f0f0e' }}>
      {/* Images */}
      {SLIDES.map((sl, i) => (
        <div key={sl.id} style={{ position:'absolute', inset:0, opacity: i===cur ? 1 : 0, transition:'opacity 1s ease', zIndex: i===cur ? 1 : 0 }}>
          <img src={sl.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', transform: i===cur ? 'scale(1.04)' : 'scale(1)', transition:'transform 8s ease' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(120deg,rgba(17,17,16,.75) 0%,rgba(17,17,16,.25) 60%,rgba(17,17,16,.1) 100%)' }} />
        </div>
      ))}

      {/* Content */}
      <div className="wrap" style={{ position:'relative', zIndex:2, height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end', paddingBottom:'clamp(2.5rem,5vw,4rem)' }}>
        <div style={{ maxWidth:600 }}>
          <p className="label-xs" style={{ color:'var(--gold)', marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ width:20, height:1, background:'var(--gold)', display:'inline-block' }} />
            {t('hero_eyebrow')}
          </p>

          <div style={{ opacity: fading ? 0 : 1, transform: fading ? 'translateY(8px)' : 'translateY(0)', transition:'opacity .4s ease, transform .4s ease' }}>
            <p style={{ fontSize:'.875rem', fontWeight:500, color:'rgba(255,255,255,.5)', letterSpacing:'.05em', textTransform:'uppercase', marginBottom:'.4rem' }}>{s.artist}</p>
            <h1 className="display" style={{ fontSize:'clamp(2.75rem,8vw,6rem)', fontWeight:300, color:'#fff', letterSpacing:'-.025em', lineHeight:.95, marginBottom:'1rem' }}>
              {s.title}
            </h1>
            <p style={{ fontSize:'.875rem', color:'rgba(255,255,255,.45)', marginBottom:'2rem' }}>{s.info}</p>

            <div style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
              <div className="glass-dark" style={{ padding:'.55rem 1.125rem', borderRadius:'var(--r-pill)' }}>
                <span style={{ fontSize:'1.125rem', fontWeight:700, color:'#fff' }}>{s.price}</span>
              </div>
              <Link href="/marketplace" className="btn-base" style={{ padding:'.68rem 1.35rem', background:'rgba(255,255,255,.12)', color:'#fff', borderRadius:'var(--r-pill)', border:'1px solid rgba(255,255,255,.2)', backdropFilter:'blur(10px)' }}>
                {t('hero_cta')} →
              </Link>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ position:'absolute', bottom:'clamp(2.5rem,5vw,4rem)', right:'clamp(1.25rem,4vw,3.5rem)', display:'flex', alignItems:'center', gap:8 }}>
          {/* Thumbs */}
          <div style={{ display:'flex', gap:5 }} className="hidden md:flex">
            {SLIDES.map((sl,i) => (
              <button key={sl.id} onClick={() => go(i)} style={{ width:42, height:52, borderRadius:8, overflow:'hidden', border:`2px solid ${i===cur?'rgba(255,255,255,.8)':'transparent'}`, padding:0, cursor:'pointer', opacity: i===cur?1:.4, transition:'all .3s ease' }}>
                <img src={sl.img} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </button>
            ))}
          </div>

          <button onClick={prev} style={{ width:38, height:38, borderRadius:'var(--r-pill)', background:'rgba(255,255,255,.12)', border:'1px solid rgba(255,255,255,.18)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)' }}>
            <ChevronLeft size={15} />
          </button>
          <button onClick={next} style={{ width:38, height:38, borderRadius:'var(--r-pill)', background:'rgba(255,255,255,.12)', border:'1px solid rgba(255,255,255,.18)', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)' }}>
            <ChevronRight size={15} />
          </button>

          <span className="display" style={{ color:'rgba(255,255,255,.35)', fontSize:'.875rem', minWidth:32 }}>
            {String(cur+1).padStart(2,'0')}/{String(SLIDES.length).padStart(2,'0')}
          </span>
        </div>

        {/* Dots mobile */}
        <div style={{ position:'absolute', bottom:'1.25rem', left:'50%', transform:'translateX(-50%)', display:'flex', gap:5 }} className="md:hidden">
          {SLIDES.map((_,i) => (
            <button key={i} onClick={() => go(i)} style={{ width: i===cur?18:5, height:5, borderRadius:'var(--r-pill)', background: i===cur?'#fff':'rgba(255,255,255,.3)', border:'none', cursor:'pointer', padding:0, transition:'all .3s ease' }} />
          ))}
        </div>
      </div>
    </section>
  )
}
