'use client'

import { useState } from 'react'
import { Link } from '@/i18n/navigation'
import { Upload, CheckCircle } from 'lucide-react'

const MEDIUMS = ['Oil on canvas', 'Acrylic', 'Watercolor', 'Gouache', 'Pastel', 'Charcoal', 'Ink', 'Mixed media', 'Photography', 'Digital', 'Sculpture', 'Ceramics', 'Textile', 'Print', 'Other']
const CATEGORIES = ['Painting', 'Sculpture', 'Photography', 'Digital art', 'Print', 'Drawing', 'Installation', 'Textile', 'Ceramics', 'Mixed media']

export default function SubmitPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', medium: '', category: '', year: '', width: '', height: '', price: '' })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1500)
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8F7F4' }}>
        <div style={{ textAlign: 'center', maxWidth: 480, padding: '2rem' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <CheckCircle size={28} color="#22C55E" />
          </div>
          <h2 className="font-display" style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '0.75rem' }}>Submitted successfully</h2>
          <p style={{ color: '#6B6865', lineHeight: 1.7, marginBottom: '2rem' }}>
            Thank you for submitting your work to KHazar Arts. Our curatorial team will review your submission and respond within 5–7 business days.
          </p>
          <Link href="/" className="btn-primary">Return to homepage</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#F8F7F4', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2DDD6', padding: '2.5rem 0 2rem' }}>
        <div className="content-container" style={{ maxWidth: 800 }}>
          <p className="text-label" style={{ color: 'var(--color-gold)', fontSize: '0.6875rem', marginBottom: 8 }}>For artists</p>
          <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, margin: '0 0 0.75rem', letterSpacing: '-0.01em' }}>Submit your work</h1>
          <p style={{ fontSize: '1rem', color: '#6B6865', maxWidth: 540, lineHeight: 1.6, margin: 0 }}>
            Our curatorial team reviews every submission within 5–7 business days. We look for originality, exceptional craft, and a distinct artistic voice.
          </p>
        </div>
      </div>

      <div className="content-container" style={{ maxWidth: 800, paddingTop: '2.5rem', paddingBottom: '5rem' }}>

        {/* Info banner */}
        <div style={{ background: '#FFFBF0', border: '1px solid #F0CC70', borderRadius: 8, padding: '1rem 1.25rem', marginBottom: '2rem', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1rem' }}>ℹ️</span>
          <p style={{ fontSize: '0.875rem', color: '#92741A', margin: 0, lineHeight: 1.55 }}>
            Only artists with an approved profile can submit works. Don&apos;t have an account yet?{' '}
            <Link href={`/auth/sign-up`} style={{ color: '#92741A', fontWeight: 500 }}>Create one as an artist →</Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: 12, padding: '2.5rem', border: '1px solid #E2DDD6' }}>

          {/* Image upload */}
          <div style={{ marginBottom: '2rem' }}>
            <label className="form-label">Images <span style={{ color: '#A09D99', textTransform: 'none', letterSpacing: 0, fontSize: '0.8125rem', fontWeight: 400 }}>— upload 3 to 8 high-resolution photos</span></label>
            <div style={{ border: '2px dashed #E2DDD6', borderRadius: 10, padding: '3rem 1.5rem', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s ease, background 0.2s ease', background: '#FAFAF9' }}>
              <Upload size={28} color="#C0BDB8" style={{ margin: '0 auto 0.75rem' }} />
              <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: '#1A1917', margin: '0 0 0.25rem' }}>Drop files here or click to upload</p>
              <p style={{ fontSize: '0.8125rem', color: '#A09D99', margin: 0 }}>JPG, PNG or TIFF · Max 20 MB per file</p>
            </div>
          </div>

          {/* Title + Description */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Title</label>
              <input type="text" value={form.title} onChange={e => set('title', e.target.value)} className="form-input" placeholder="Title of the work" required />
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Artist statement <span style={{ color: '#A09D99', textTransform: 'none', letterSpacing: 0, fontSize: '0.8125rem', fontWeight: 400 }}>— describe this work and your process</span></label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} className="form-input" placeholder="What inspired this work? What does it mean to you?" rows={4} required style={{ resize: 'vertical' }} />
            </div>
          </div>

          {/* Medium + Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label className="form-label">Medium</label>
              <select value={form.medium} onChange={e => set('medium', e.target.value)} className="form-input" required style={{ appearance: 'none' }}>
                <option value="">Select medium</option>
                {MEDIUMS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="form-input" required style={{ appearance: 'none' }}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Year + Dimensions + Price */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
            <div>
              <label className="form-label">Year</label>
              <input type="number" value={form.year} onChange={e => set('year', e.target.value)} className="form-input" placeholder="2024" min={1900} max={2100} required />
            </div>
            <div>
              <label className="form-label">Height (cm)</label>
              <input type="number" value={form.height} onChange={e => set('height', e.target.value)} className="form-input" placeholder="120" />
            </div>
            <div>
              <label className="form-label">Width (cm)</label>
              <input type="number" value={form.width} onChange={e => set('width', e.target.value)} className="form-input" placeholder="90" />
            </div>
            <div>
              <label className="form-label">Price (USD)</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} className="form-input" placeholder="3500" min={100} required />
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <p style={{ fontSize: '0.8125rem', color: '#A09D99', margin: 0, maxWidth: 380, lineHeight: 1.5 }}>
              By submitting you confirm this is your original work and you hold all rights to it.
            </p>
            <button type="submit" disabled={loading}
              style={{ padding: '0.875rem 2rem', background: loading ? '#6B6865' : '#1A1917', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.9375rem', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-inter)', whiteSpace: 'nowrap', transition: 'background 0.2s ease' }}>
              {loading ? 'Submitting…' : 'Submit for review →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
