import { NextPage, GetStaticProps } from "next";
import path from "path"
import fs from "fs"

import styles from "styles/Home.module.css";
import { Hero } from "components/Hero";
import { Card } from "components/Card";
import { Footer } from "components/Footer";
import { useI18N } from 'context/i18n'

type Props = {
  contentHero: HomeAttributes;
  newsEvents:Array<Object>
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
  home_title: string;
}

const LANGUAGE = 'en'

const ResourcesPage: NextPage<Props> = ({ newsEvents, contentHero }) => {
  const {
     logo_alt, hero_title, home_title 
  } = contentHero;
  const {t} = useI18N()
  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <h1>{t('NEWS_EVENTS')}</h1>
      <article className={styles.content}>
        <section>
          {newsEvents.map((newsEvent:any) => {
            const {attributes, slug} = newsEvent

            return <Card key={slug} props={attributes} slug={slug}/>
          })}
        </section>
      </article>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const contentHero = await import(`content/pages/${locale}/home.md`)
  
  const newsEventsDirectory = path.join(process.cwd(), `content/news-events/${locale}`)
  const newsEventsFilenames = fs.readdirSync(newsEventsDirectory)
  const newsEvents = await Promise.all(newsEventsFilenames.map(async filename => {
    const fileContents = await import(`content/news-events/${locale}/${filename}`)
    return {slug: `/news-events/${filename.split('.')[0]}`, attributes: fileContents.attributes}
  })).then (result => result)

  return { props: { newsEvents, contentHero: contentHero.attributes } }
};

export default ResourcesPage;