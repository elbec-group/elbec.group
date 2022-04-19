import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image"
import path from "path"
import fs from "fs"
import ReactMarkdown from 'react-markdown'
import {DEFAULT_LANGUAGE, LOCALES} from "config/index"

import styles from "./Resource.module.css";
import { Footer } from "components/Footer";
import { Hero } from "components/Hero";


const LANGUAGE = 'en'
const Post = ({content, contentHero}: any) => {
  // const { 
  //   publication_type,
  //   eds,
  //   name,
  //   journal,
  //   publishing_house,
  //   year,
  //   doi,
  //   abstract,
  //   authors,
  //   elbec_members_involved,
  //   projects } = content
  const {hero_title, logo_alt} = contentHero

  
  // const LANG: string = navigator && navigator.language || 'en-US'
  const LANG = 'en-US'
  const DATE_OPTIONS: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  // const date = new Date(publication_date).toLocaleDateString(LANG, DATE_OPTIONS)

  return (
    <article className={styles.Wrapper}>
      <Hero title={hero_title} textAlt={logo_alt} />
      <section className={styles.Content}>
        <h1 className={styles.Title}>Resources</h1>
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
        
        {/* <ReactMarkdown>{abstract}</ReactMarkdown> */}
      </section>
      <Footer />
    </article>
  );
};


export const getStaticPaths: GetStaticPaths = async ({locales}: any) => {
  const resourcesDirectory = path.join(process.cwd(), `./content/resources/${DEFAULT_LANGUAGE}`)
  const resourcesFilenames = fs.readdirSync(resourcesDirectory)
  const resourcePaths = await Promise.all(resourcesFilenames.map(async filename => {
    return `${filename.split('.')[0]}`
  })).then (result => result)
  const paths = locales.map((locale: string) => {
    return resourcePaths.map((resource: any) => {
      return { params: { resource }, locale }
    })
  }).flat();
  
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const slug = params.resource as string;
  const contentHero = await import(`content/pages/${LANGUAGE}/home.md`)
  const resourceContents = await import(`content/resources/${LANGUAGE}/${slug}.md`)

  return {props: {content: resourceContents.attributes, contentHero: contentHero.attributes}}
};

export default Post;
