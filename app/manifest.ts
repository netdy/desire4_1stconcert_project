import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DESIRE4 1st Concert Project',
    short_name: 'D4 Project TH',
    description: 'Support project for DESIRE4 1st Concert in Bangkok',
    start_url: '/',
    display: 'standalone',
    background_color: '#0d0d0d',
    theme_color: '#d4af37',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}
