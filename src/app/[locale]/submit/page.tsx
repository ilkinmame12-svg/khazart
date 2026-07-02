'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Upload, CheckCircle } from 'lucide-react'

const MEDIUMS = ['Oil on canvas','Acrylic','Watercolor','Gouache','Pastel','Charcoal','Ink','Mixed media','Photography','Digital','Sculpture','Ceramics','Textile','Print','Other']
const CATS    = ['Painting','Sculpture','Photography','Digital art','Print','Drawing','Installation','Textile','Ceramics','Mixed media']

export default function SubmitPage() {
  const t = useTranslations('submit')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title:'', description:'', medium:'', category:'', year:'', width:'', height:'', price:'' })
  const set = (k:string,v:string) => setForm(f => ({...f,[k]:v}))

  if (done) return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg)' }}>
      <div style={{ textAlign:'center', maxWidth:440, padding:'2rem' }}>
        <div style={{ width:60, height:60, borderRadius:'50%', background:'#F0FDF4', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1.375rem' }}>
          <CheckCircle size={26} color="#22C55E" />
        </div>
        <h2 className="display" style={{ fontSize:'1.875rem', marginBottom:'.625rem' }}>{t('success_title')}</h2>
        <p style={{ color:'var(--muted)', lineHeight:1.7, marginBottom:'1.75rem' }}>{t('success_body')}</p>
        <Link href="/" className="btn-base btn-dark" style={{ padding:'.8rem 1.75rem' }}>Return to homepage</Link>
      </div>
    </div>
  )

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      <div style={{ background:'#fff', borderBottom:'1px solid var(--border)', padding:'2.25rem 0 2rem' }}>
        <div className="wrap" style={{ maxWidth:760 }}>
          <p className="sec-eyebrow" style={{ marginBottom:6 }}>For artists</p>
          <h1 className="display" style={{ fontSize:'clamp(1.875rem,4vw,2.75rem)', letterSpacing:'-.02em', margin:'0 0 .75rem' }}>{t('title')}</h1>
          <p style={{ fontSize:'.9375rem', color:'var(--muted)', maxWidth:520, lineHeight:1.65, margin:0 }}>{t('intro')}</p>
        </div>
      </div>

      <div className="wrap" style={{ maxWidth:760, paddingTop:'2rem', paddingBottom:'5rem' }}>
        <div style={{ background:'#FFFBF0', border:'1px solid #EDD97B', borderRadius:'var(--r-md)', padding:'.875rem 1.125rem', marginBottom:'1.75rem' }}>
          <p style={{ fontSize:'.875rem', color:'#92741A', margin:0, lineHeight:1.55 }}>
            Only verified artists can submit works.{' '}
            <Link href="/auth/sign-up" style={{ color:'#92741A', fontWeight:600 }}>Create an artist account →</Link>
          </p>
        </div>

        <form onSubmit={e => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setDone(true) }, 1500) }}
          style={{ background:'#fff', borderRadius:'var(--r-xl)', padding:'2.25rem', border:'1px solid var(--border)' }}>

          {/* Upload zone */}
          <div style={{ marginBottom:'1.75rem' }}>
            <label className="f-label">{t('images')}</label>
            <div style={{ border:'2px dashed var(--border2)', borderRadius:'var(--r-lg)', padding:'2.75rem 1.5rem', textAlign:'center', cursor:'pointer', background:'var(--bg)' }}>
              <Upload size={26} color="var(--faint)" style={{ margin:'0 auto .75rem' }} />
              <p style={{ fontSize:'.9375rem', fontWeight:500, color:'var(--ink)', margin:'0 0 .25rem' }}>Drop files or click to upload</p>
              <p style={{ fontSize:'.8125rem', color:'var(--muted)', margin:0 }}>JPG, PNG or TIFF · Max 20 MB · {t('images_note')}</p>
            </div>
          </div>

          <div style={{ display:'grid', gap:'1.125rem', marginBottom:'1.125rem' }}>
            <div>
              <label className="f-label">{t('artwork_title')}</label>
              <input type="text" value={form.title} onChange={e => set('title',e.target.value)} className="f-input" placeholder={t('artwork_title_placeholder')} required />
            </div>
            <div>
              <label className="f-label">{t('description')}</label>
              <textarea value={form.description} onChange={e => set('description',e.target.value)} className="f-input" placeholder={t('description_placeholder')} rows={4} required style={{ resize:'vertical' }} />
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.125rem', marginBottom:'1.125rem' }}>
            <div>
              <label className="f-label">{t('medium')}</label>
              <select value={form.medium} onChange={e => set('medium',e.target.value)} className="f-input" required style={{ appearance:'none' }}>
                <option value="">{t('medium')}</option>
                {MEDIUMS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="f-label">{t('category')}</label>
              <select value={form.category} onChange={e => set('category',e.target.value)} className="f-input" required style={{ appearance:'none' }}>
                <option value="">{t('category')}</option>
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'1.125rem', marginBottom:'1.75rem' }}>
            {[
              { key:'year',   label:t('year'),   placeholder:'2024', type:'number' },
              { key:'height', label:t('height'),  placeholder:'120',  type:'number' },
              { key:'width',  label:t('width'),   placeholder:'90',   type:'number' },
              { key:'price',  label:t('price'),   placeholder:'3500', type:'number' },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="f-label">{label}</label>
                <input type={type} value={(form as any)[key]} onChange={e => set(key,e.target.value)} className="f-input" placeholder={placeholder} />
              </div>
            ))}
          </div>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
            <p style={{ fontSize:'.8125rem', color:'var(--muted)', margin:0, maxWidth:360, lineHeight:1.55 }}>
              By submitting you confirm this is your original work and you hold all rights.
            </p>
            <button type="submit" disabled={loading} style={{ padding:'.85rem 2rem', background: loading?'var(--muted)':'var(--ink)', color:'#fff', border:'none', borderRadius:'var(--r-md)', fontSize:'.9375rem', fontWeight:500, cursor: loading?'not-allowed':'pointer', fontFamily:'var(--font-inter)', whiteSpace:'nowrap', transition:'background .2s' }}>
              {loading ? t('submitting') : t('submit')} →
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
