import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import Icon from '@/components/EBIcons'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  //const { searchParams } = new URL(req.url)
  //const title = searchParams.get('title') || '8-Bit CRT'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          fontSize: 60,
          fontWeight: 800,
        }}
      >
        <h1 className="eight-bit-title text-2xl mb-4">
          8-Bit CRT <Icon name="tv" size={24} />
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}