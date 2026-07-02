'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Globe } from 'lucide-react'

const LANGS = [
  { code:'en', label:'English',      native:'EN' },
  { code:'az', label:'Azərbaycan',   native:'AZ' },
  { code:'ru', label:'Русский',      native:'RU' },
  { code:'fr', label:'Français',     native:'FR' },
]

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const go = (code: string) => {
    const segs = pathname.split('/')
    segs[1] = code
    window.location.href = segs.join('/')
  }

  return (
    <div style={{ position:'relative' }}>
      <button onClick={() => setOpen(v => !v)} style={{
        display:'flex', alignItems:'center', gap:5,
        padding:'.48rem .75rem', borderRadius:'var(--r-pill)',
        background:'none', border:'1px solid var(--border)',
        cursor:'pointer', fontSize:'.75rem', fontWeight:600,
        color:'var(--muted)', letterSpacing:'.06em',
      }}>
        <Globe size={12} strokeWidth={2} />
        {locale.toUpperCase()}
      </button>

      {open && (
        <>
          <div style={{ position:'fixed', inset:0, zIndex:10 }} onClick={() => setOpen(false)} />
          <div style={{
            position:'absolute', right:0, top:'calc(100% + 6px)', zIndex:20,
            background:'#fff', borderRadius:'var(--r-md)',
            border:'1px solid var(--border)', boxShadow:'var(--sh-lg)',
            padding:'.35rem', minWidth:148,
          }}>
            {LANGS.map(({ code, label, native }) => (
              <button key={code} onClick={() => go(code)} style={{
                width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'.6rem .875rem', borderRadius:'var(--r-sm)',
                border:'none', cursor:'pointer', textAlign:'left',
                fontSize:'.875rem', fontWeight: code === locale ? 600 : 400,
                color: code === locale ? 'var(--ink)' : 'var(--muted)',
                background: code === locale ? 'var(--bg)' : 'transparent',
              }}>
                {label}
                <span style={{ fontSize:'.7rem', color:'var(--border2)', fontWeight:700 }}>{native}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
