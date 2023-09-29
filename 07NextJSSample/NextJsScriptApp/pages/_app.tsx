import type { AppProps } from 'next/app'
/* already added in the DX Module
import 'video.js/dist/video-js.css'*/

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
