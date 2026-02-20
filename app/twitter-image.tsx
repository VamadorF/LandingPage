import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'eJoi – Compañera Virtual con IA y Memoria Persistente'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #FEFEFE 0%, #f0edf9 40%, #fce8f0 70%, #FEFEFE 100%)',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(186, 176, 237, 0.25)',
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            left: -60,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(242, 10, 100, 0.12)',
            filter: 'blur(100px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '15%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(186, 176, 237, 0.15)',
            filter: 'blur(60px)',
            transform: 'translateY(-50%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            padding: '40px 60px',
            textAlign: 'center',
          }}
        >
          {/* Brand name */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: '#F20A64',
              letterSpacing: '-2px',
              marginBottom: 8,
              lineHeight: 1,
            }}
          >
            eJoi
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: '#3C3C3B',
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            Tu compañera virtual con IA
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: 'rgba(60, 60, 59, 0.75)',
              maxWidth: 700,
              lineHeight: 1.4,
              marginBottom: 40,
            }}
          >
            Memoria persistente · Avatar personalizado · Relación continua
          </div>

          {/* CTA badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              background: '#F20A64',
              color: 'white',
              padding: '14px 36px',
              borderRadius: 50,
              fontSize: 22,
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(242, 10, 100, 0.30)',
            }}
          >
            Preregístrate gratis
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #BAB0ED, #F20A64)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
