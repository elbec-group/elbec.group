import {NextPage, GetStaticProps} from "next";
import path from "path"
import fs from "fs"
import styles from "../../styles/NewsEvents.module.css";
import {Hero} from "components/Hero";
import {Card} from "components/Card";
import {Footer} from "components/Footer";
import {useI18N} from 'context/i18n'

type Props = {
  contentHero: HomeAttributes;
  newsEvents: Array<Object>
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
  home_title: string;
}

const LANGUAGE = 'en'

const NewsEventsPage: NextPage<Props> = ({newsEvents, contentHero}) => {
  const {t} = useI18N();
  const {logo_alt, hero_title} = contentHero;

  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{t('NEWS_EVENTS')}</h1>
        <ul className={styles.newsList}>
          {newsEvents.map((newsEvent: any) => {
            const {attributes, slug} = newsEvent;
            return (
              <li key={slug} className={styles.newsItem}>
                <Card props={attributes} slug={slug} />
              </li>
            );
          })}
        </ul>
      </main>
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
  })).then(result => result.sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime()))

  return {props: {newsEvents, contentHero: contentHero.attributes}}
};

export default NewsEventsPage;
