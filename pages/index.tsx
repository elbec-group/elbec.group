/* eslint-disable */
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>elbec group</title>
        <meta name="description" content="Educación lingüística basada en evidencias científicas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img src="/elbec.svg" alt="elbec group" width="300px" height="121px" />
    </div>
  )
}
/* eslint-enable */
