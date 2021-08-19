/* eslint-disable */
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Logo} from '../componets/Logo'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>elbec group</title>
        <meta name="description" content="Educación lingüística basada en evidencias científicas" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />
      </Head>

      <Logo
          className={styles.Logo}
          alt="Educación lingüística basada en evidencias científicas"
          isAnimated
        />
      <h1 className={styles.Title}>Educación lingüística<br/>basada en evidencias científicas</h1>
    </div>
  )
}
/* eslint-enable */
