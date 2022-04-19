import { useRouter } from "next/router";
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import path from "path"
import fs from "fs"
import { useI18N } from 'context/i18n'

import styles from "styles/Home.module.css";
import { Hero } from "../components/Hero"
import { Card } from "components/Card";
import { Footer } from "components/Footer";

type Props = {
  config:{ attributes: ConfigAttributes };
  content: { attributes: HomeAttributes };
  newsEvents: object[],
  projects: object[]
}

type ConfigAttributes = {
  num_news: number;
  num_projects: number;
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
  home_title: string;
}

const HomePage: NextPage<Props> = ({ config, content, newsEvents, projects }) => {
  const {t} = useI18N()
  const {
    attributes: { logo_alt, hero_title, home_title },
  } = content;
  const { attributes: {num_news = 2, num_projects = 2 }} = config;  

  const newsHome = newsEvents.slice(0, num_news)
  const projectsHome = projects.slice(0, num_projects)

  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} isFullHeight/>
      <article className={styles.content}>

        <section>
          <h3 className={styles.SectionTitle}>{t('NEWS')}</h3>
          {newsHome.map((theNew:any) => {
            const {attributes, slug} = theNew
            
            return <Card props={attributes} slug={slug} key={slug} />
          })}
        </section>

        {home_title ? <h2 className={styles.Title}>{home_title}</h2> : null}

        <section>
          <h3 className={styles.SectionTitle}>{t('PROJECTS')}</h3>
          {projectsHome.map((project:any) => {
            const {attributes, slug} = project
            return <Card key={slug} props={attributes} slug={slug}/>
          })}
        </section>
      </article>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const configHome = await import('../content/config/home.md')
  const contentHome = await import(`../content/pages/${locale}/home.md`)
  
  const projectsDirectory = path.join(process.cwd(), `content/projects/${locale}`)
  const projectsFilenames = fs.readdirSync(projectsDirectory)
  const projects = await Promise.all(projectsFilenames.map(async filename => {
    const fileContents = await import(`../content/projects/${locale}/${filename}`)
    return {slug: `/projects/${filename.split('.')[0]}`, attributes: fileContents.attributes}
  })).then (result => result)

  const newsEventsDirectory = path.join(process.cwd(), `content/news-events/${locale}`)
  const newsEventsFilenames = fs.readdirSync(newsEventsDirectory)
  const newsEvents = await Promise.all(newsEventsFilenames.map(async filename => {
    const fileContents = await import(`../content/news-events/${locale}/${filename}`)
    return {slug: `/news-events/${filename.split('.')[0]}`, attributes: fileContents.attributes}
  })).then (result => result)

  return { props: { config: configHome.default, content: contentHome.default, projects, newsEvents } }
};

export default HomePage;
