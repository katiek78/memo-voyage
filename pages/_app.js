import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MemoVoyage</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">Home</Link>          
          <Link href="/new">Add journey</Link>
          <Link href="/about">About</Link>
        </div>

        <img
          id="title"
          src="assets/memo-voyage-logo.png"
          alt="MemoVoyage logo"
        ></img>
      </div>
      <div className="wrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
