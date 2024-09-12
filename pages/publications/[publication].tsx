import {GetStaticPaths, GetStaticProps} from "next";
import Link from "next/link";
import path from "path"
import fs from "fs"
import ReactMarkdown from 'react-markdown'

import styles from "./Publication.module.css";
import {Footer} from "components/Footer";

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
    projects
  } = content;
  const {hero_title, logo_alt} = contentHero;

  const LANG = 'en-US';
  const DATE_OPTIONS: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};

  const renderInfoItem = (label: string, value: string | string[]) => {
    if (!value || value === '.' || (Array.isArray(value) && value.length === 0)) return null;
    return (
      <li>
        <span>{label}:</span>
        {Array.isArray(value) ? value.join(', ') : value}
      </li>
    );
  };

  return (
    <article className={styles.Wrapper}>
      <section className={styles.Content}>
        <h1 className={styles.Title}>{name}</h1>
        <div className={styles.Information}>
          <ul className={styles.InformationList}>
            {renderInfoItem("Publication type", publication_type)}
            {renderInfoItem("EDS", eds)}
            {renderInfoItem("Journal", journal)}
            {renderInfoItem("Publishing house", publishing_house)}
            {renderInfoItem("Year", year)}
            {doi && doi !== '.' && (
              <li>
                <span>DOI:</span>
                <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer">
                  {doi}
                </a>
              </li>
            )}
            {renderInfoItem("Authors", authors)}
            {renderInfoItem("Elbec members involved", elbec_members_involved)}
            {projects && projects.length > 0 && projects[0] !== '.' && renderInfoItem("Associated project", projects)}
          </ul>
        </div>

        <ReactMarkdown>{abstract}</ReactMarkdown>
      </section>
      <Footer />
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async ({locales}: any) => {
  const LANGUAGE = 'en';
  const publicationsDirectory = path.join(process.cwd(), `./content/publications/${LANGUAGE}`)
  const publicationsFilenames = fs.readdirSync(publicationsDirectory)
  const publicationPaths = await Promise.all(publicationsFilenames.map(async filename => {
    return `${filename.split('.')[0]}`
  })).then(result => result)
  const paths = locales.map((locale: string) => {
    return publicationPaths.map((publication: any) => {
      return {params: {publication}, locale}
    })
  }).flat();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({params}: any) => {
  const LANGUAGE = 'en';
  const slug = params.publication as string;
  const contentHero = await import(`content/pages/${LANGUAGE}/home.md`)
  const publicationContents = await import(`content/publications/${LANGUAGE}/${slug}.md`)

  return {props: {content: publicationContents.attributes, contentHero: contentHero.attributes}}
};

export default Post;
