import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import path from "path"
import fs from "fs"
import ReactMarkdown from 'react-markdown'
import { useRouter } from "next/router";
import { useI18N } from 'context/i18n'
import { DATE_OPTIONS, DEFAULT_LANGUAGE, LOCALES } from "config/index"

import styles from "./NewsEvents.module.css";
import { Footer } from "components/Footer";
import { HeroImage } from "components/HeroImage";

const Post = ({ content, contentHero }: any) => {
  const { t } = useI18N();
  const { locale } = useRouter();
  console.log(typeof locale)
  const {
    name,
    image,
    date,
    abstract } = content
  //  const {hero_title, logo_alt} = contentHero


  // @ts-ignore
  const eventDate = new Date(date).toLocaleDateString(LOCALES[locale], DATE_OPTIONS)

  return (
    <article className={styles.Wrapper}>
      {image ? (
        <HeroImage image={image.replace('/public', '')} alt={name} />
      ) : null}
      <section className={styles.Content}>
        <h1 className={styles.Title}>{name}</h1>
        <h3 className={styles.Date}>{eventDate}</h3>
        {/* <div className={styles.Information}>
          <ul className={styles.InformationList}>
            <li><span>Publication type:</span> {publication_type}</li>
            <li><span>EDS:</span> {eds}</li>
            <li><span>Journal:</span> {journal}</li>
            <li><span>Publishing house:</span> {publishing_house}</li>
            <li><span>Year:</span> {year}</li>
            <li><span>DOI:</span> <a href={doi} rel="noreferrer" target="_blank">DOI</a></li>
            <li><span>authors:</span> {authors.map((author: string) => `${author}, `)}</li>
            <li><span>elbec members involved:</span> {elbec_members_involved}</li>
          </ul>
        </div> */}

        <ReactMarkdown>{abstract}</ReactMarkdown>
      </section>
      <Footer />
    </article>
  );
};


export const getStaticPaths: GetStaticPaths = async ({ locales }: any) => {
  const newsEventsDirectory = path.join(process.cwd(), `./content/news-events/${DEFAULT_LANGUAGE}`)
  const newsEventsFilenames = fs.readdirSync(newsEventsDirectory)
  const newsEventsPaths = await Promise.all(newsEventsFilenames.map(async filename => {
    return `${filename.split('.')[0]}`
  })).then(result => result)
  const paths = locales.map((locale: string) => {
    return newsEventsPaths.map((newevent: any) => {
      return { params: { newevent }, locale }
    })
  }).flat();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }: any) => {
  const slug = params.newevent as string;
  const contentHero = await import(`content/pages/${locale}/home.md`)
  const newsEventsContents = await import(`content/news-events/${locale}/${slug}.md`)

  return { props: { content: newsEventsContents.attributes, contentHero: contentHero.attributes } }
};

export default Post;
