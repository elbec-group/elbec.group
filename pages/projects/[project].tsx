import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image"
import path from "path"
import fs from "fs"
// import { fetchProjectContent } from "../../lib/projects";

import styles from "./Project.module.css";

import { Footer } from "../../components/Footer";
import classNames from "classnames";

type Props = {
  draft: boolean;
  id: string;
  publication_date: string;
  name: string;
  slug: string;
  image: string;
  reference: string;
  funding_agency: string;
  amount: number;
  running_from: string;
  pi: string[];
  abstract: string;
  photo: string;
  members: string[];
}

const LANGUAGE = 'en'

const Post = ({ draft,
  // id,
  publication_date,
  name,
  image,
  reference,
  funding_agency,
  amount,
  running_from,
  pi,
  abstract,
  members }: Props) => {
    console.log({image})
  
  // const LANG: string = navigator && navigator.language || 'en-US'
  const LANG: string = 'en-US'
  const DATE_OPTIONS: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date: string = new Date(publication_date).toLocaleDateString(LANG, DATE_OPTIONS)

  return (
    <article className={styles.Wrapper}>
      <header className={styles.Header}>
        {image ? (
          <Image src={image.replace('/public','')} width="1200" height="500"/>
        ) : <></>}
      </header>

      <section>
        <h1 className={styles.Title}>{name}</h1>
        <div className={styles.Information}>
          <p>
            Principal Investigator(s): {pi.map(_pi => <Link href="#" key={_pi}><a className={styles.Pi}>{_pi}</a></Link>)} 
            { members.length > 0 ? 
            (<> with {members.map((member, i, {length}) => { 
              const SEPARATOR = i === length - 1 ? '' : ', '
              return (<Link href="#" key={member}><a className={styles.Member}>{`${member}${SEPARATOR}`}</a></Link>)
              })} 
            </>) : (<></>)}
            </p>
            
          <p>Funding agency: {funding_agency}</p>
          <p>Funding: {amount}</p>
          <p>Duration: {running_from}</p>
          <p>Reference: {reference}</p>
        </div>
        <p>{abstract}</p>
      </section>

      <section className={styles.Outputs}>
        <h2 className={styles.OutputsTitle}>Outputs</h2>
        <div className={styles.OutputsContent}>
          <ul className={styles.OutputsList}>
            <li><Link href="#"><a className={styles.OutputsLink}>CREC - an SRSD intervention on planning opinion essay writing in Catalan, aimed at children in grades 4-6 (11 sessions)</a></Link></li>
            <li><Link href="#"><a className={styles.OutputsLink}>CREC - an SRSD intervention on planning opinion essay writing in Catalan, aimed at children in grades 4-6 (11 sessions)</a></Link></li>
            <li><Link href="#"><a className={styles.OutputsLink}>CREC - an SRSD intervention on planning opinion essay writing in Catalan, aimed at children in grades 4-6 (11 sessions)</a></Link></li>
            <li><Link href="#"><a className={styles.OutputsLink}>CREC - an SRSD intervention on planning opinion essay writing in Catalan, aimed at children in grades 4-6 (11 sessions)</a></Link></li>
          </ul>
          <Image src="/images/outputs.svg" width="303" height="220"/>
        </div>
      </section>

      <Footer />
    </article>
  );
};


export const getStaticPaths: GetStaticPaths = async () => {
  const projectsDirectory = path.join(process.cwd(), `./content/projects/${LANGUAGE}`)
  const projectsFilenames = fs.readdirSync(projectsDirectory)
  const projectPaths = await Promise.all(projectsFilenames.map(async filename => {
    return {params: {project: `${filename.split('.')[0]}`}}
  })).then (result => result)

  return {
    paths: projectPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const slug = params.project as string;
  const projectContents = await import(`content/projects/${LANGUAGE}/${slug}.md`)
  return {props: projectContents.attributes}
};

export default Post;
