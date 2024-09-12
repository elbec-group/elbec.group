import {GetStaticPaths, GetStaticProps} from "next";
import path from "path";
import fs from "fs";
import ReactMarkdown from 'react-markdown';
import styles from "./Publication.module.css";
import {Footer} from "components/Footer";
import {DEFAULT_LANGUAGE, LOCALES} from "config/index";

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

  const isValidField = (field: string | undefined) => field && field.trim() !== '.';
  const isValidArray = (arr: string[] | undefined) => arr && arr.length > 0 && arr.some(item => isValidField(item));

  return (
    <article className={styles.Wrapper}>
      <section className={styles.Content}>
        <h1 className={styles.Title}>{name}</h1>
        <div className={styles.Information}>
          <ul className={styles.InformationList}>
            {isValidField(publication_type) && <li><span>Publication type:</span> {publication_type}</li>}
            {isValidField(eds) && <li><span>EDS:</span> {eds}</li>}
            {isValidField(journal) && <li><span>Journal:</span> {journal}</li>}
            {isValidField(publishing_house) && <li><span>Publishing house:</span> {publishing_house}</li>}
            {isValidField(year) && <li><span>Year:</span> {year}</li>}
            {isValidField(doi) && <li><span>DOI:</span> <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer">{doi}</a></li>}
            {isValidArray(authors) && <li><span>Authors:</span> {authors.filter(isValidField).join(', ')}</li>}
            {isValidArray(elbec_members_involved) && (
              <li>
                <span>ELBEC members involved:</span> {elbec_members_involved.filter(isValidField).join(', ')}
              </li>
            )}
            {isValidArray(projects) && (
              <li>
                <span>Related projects:</span> {projects.filter(isValidField).join(', ')}
              </li>
            )}
          </ul>
        </div>

        <ReactMarkdown>{abstract}</ReactMarkdown>
      </section>
      <Footer />
    </article>
  );
};

export const getStaticPaths: GetStaticPaths = async ({locales}: any) => {
  const publicationsDirectory = path.join(process.cwd(), `./content/publications/${DEFAULT_LANGUAGE}`);
  const publicationsFilenames = fs.readdirSync(publicationsDirectory);
  const publicationPaths = await Promise.all(publicationsFilenames.map(async filename => {
    return `${filename.split('.')[0]}`;
  })).then(result => result);
  const paths = locales.map((locale: string) => {
    return publicationPaths.map((publication: any) => {
      return {params: {publication}, locale};
    });
  }).flat();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({params, locale}: any) => {
  const slug = params.publication as string;

  try {
    const contentHero = await import(`content/pages/${locale}/home.md`);
    const publicationContents = await import(`content/publications/${locale}/${slug}.md`);

    return {
      props: {
        content: publicationContents.attributes,
        contentHero: contentHero.attributes
      }
    };
  } catch (error) {
    console.error(`Error loading publication: ${slug}`, error);

    // Return notFound if the file doesn't exist
    return {notFound: true};
  }
};

export default Post;
