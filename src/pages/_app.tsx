import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { StylesContent } from "../styles/StylesContent"
import { useRouter } from 'next/router'
import Navbar from "../components/navbar"
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>

      {router.pathname === "/" ? null : <Navbar></Navbar>}
      {router.pathname === "/" ? <Component {...pageProps} /> : <StylesContent> <div className="content" > <Component {...pageProps} /></div></StylesContent>}

      {router.pathname === "/" ? null : <footer></footer>}
    </>)
}

export default MyApp
