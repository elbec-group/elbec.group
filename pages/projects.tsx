/* eslint-disable */
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";

import htmr from "htmr";

import styles from "../styles/Projects.module.css";
import { Logo } from "../components/Logo";
import { Lines } from "../components/Lines";

interface Props {
  content: { attributes: HomeAttributes };
}
interface HomeAttributes {
  hero_title: string;
  logo_alt: string;
  home_title: string;
  num_news: number;
  num_projects: number;
}

const LANGUAGE = 'en'

const ProjectsPage: NextPage<Props> = ({ content }) => {
  console.log({content})
  const {
    attributes: { logo_alt, hero_title, home_title, num_news = 2, num_projects = 2 },
  } = content;
  return (
    <div className={styles.container}>
      <Head>
        <title>elbec group</title>
        <meta
          name="description"
          content="Educación lingüística basada en evidencias científicas"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div>
        <Logo className={styles.Logo} alt={logo_alt} isAnimated />
        <h1 className={styles.Title}>{htmr(hero_title)}</h1>
      </div>
      <Lines />
      <section>
        <h2>{home_title}</h2>
        <div>
          {num_news}
        </div>
        <div>
          {num_projects}
        </div>
      </section>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contentHome = await import(`../content/pages/${LANGUAGE}/${"home"}.md`);
  console.log('content', contentHome)
  console.log('attributes', contentHome.attributes)
  console.log('html', contentHome.html)
  console.log('default', contentHome.default)
  return { props: { content: contentHome.default } };
};

export default ProjectsPage;
/* eslint-enable */
