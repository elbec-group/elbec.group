import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>elbec group</title>
        <meta name="description" content="Educación lingüística basada en evidencias científicas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Image src="/elbec.svg" alt="elbec group" width={300} height={121} />
    </div>
  )
}
