import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image"
import path from "path"
import fs from "fs"
import ReactMarkdown from 'react-markdown'

import styles from "./Publication.module.css";
import { Footer } from "components/Footer";


const LANGUAGE = 'en'
const Post = ({content, contentHero}: any) => {
  const { 
    publication_type,
    eds,
    name,
    journal,
    publishing_house,
    year,
    doi,
    abstract,
    authors,
    elbec_members_involved,
    projects } = content
  const {hero_title, logo_alt} = contentHero

  
  // const LANG: string = navigator && navigator.language || 'en-US'
  const LANG = 'en-US'
  const DATE_OPTIONS: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  // const date = new Date(publication_date).toLocaleDateString(LANG, DATE_OPTIONS)

  return (
    <article className={styles.Wrapper}>
      <section className={styles.Content}>
        <h1 className={styles.Title}>{name}</h1>
        <div className={styles.Information}>
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
        </div>
        
        <ReactMarkdown>{abstract}</ReactMarkdown>
      </section>
      <Footer />
    </article>
  );
};


export const getStaticPaths: GetStaticPaths = async ({locales}: any) => {
  const publicationsDirectory = path.join(process.cwd(), `./content/publications/${LANGUAGE}`)
  const publicationsFilenames = fs.readdirSync(publicationsDirectory)
  const publicationPaths = await Promise.all(publicationsFilenames.map(async filename => {
    return `${filename.split('.')[0]}`
  })).then (result => result)
  const paths = locales.map((locale: string) => {
    return publicationPaths.map((publication: any) => {
      return { params: { publication }, locale }
    })
  }).flat();
  
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const slug = params.publication as string;
  const contentHero = await import(`content/pages/${LANGUAGE}/home.md`)
  const publicationContents = await import(`content/publications/${LANGUAGE}/${slug}.md`)

  return {props: {content: publicationContents.attributes, contentHero: contentHero.attributes}}
};

export default Post;
