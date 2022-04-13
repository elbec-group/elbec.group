import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image"
import path from "path"
import fs from "fs"
import ReactMarkdown from 'react-markdown'
// import { fetchProjectContent } from "../../lib/projects";

import styles from "./Project.module.css";

import { Footer } from "../../components/Footer";
import classNames from "classnames";



type Props = {
  abstract: string;
  amount: number;
  currency_type: string;
  draft: boolean;
  funding_agency: string;
  id: string;
  image: string;
  members: string[];
  name: string;
  order: number;
  pi: string[];
  publication_date: string;
  reference: string;
  relevant_outputs: object[];
  running_from: string;
  slug: string;
}

const LANGUAGE = 'en'
const Post = ({ 
  abstract,
  amount,
  currency_type,
  funding_agency,
  // id,
  image,
  members,
  name,
  // order,
  pi,
  // publication_date,
  reference,
  relevant_outputs,
  running_from,
  slug }: Props) => {
  
  // const LANG: string = navigator && navigator.language || 'en-US'
  const LANG = 'en-US'
  const DATE_OPTIONS: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  // const date = new Date(publication_date).toLocaleDateString(LANG, DATE_OPTIONS)
  const currencyFormat = new Intl.NumberFormat(LANG, { style: 'currency', currency: currency_type })

  return (
    <article className={styles.Wrapper}>
      <header className={styles.Header}>
        {image ? (
          <Image src={image.replace('/public','')} alt={name} width="1200" height="500"/>
        ) : null}
      </header>

      <section className={styles.Content}>
        <h1 className={styles.Title}>{name}</h1>
        <div className={styles.Information}>
          <ul className={styles.InformationList}>
            <li>
              <span>Principal Investigator(s):</span> {pi.map(_pi => <Link href="#" key={_pi}><a className={styles.Pi}>{_pi}</a></Link>)} 
              { members?.length > 0 ? 
              (<> with {members.map((member, i, {length}) => { 
                const SEPARATOR = i === length - 1 ? '' : ', '
                return (<Link href="#" key={member}><a className={styles.Member}>{`${member}${SEPARATOR}`}</a></Link>)
              })} 
              </>) : null}
            </li>
              
            <li><span>Funding agency:</span> {funding_agency}</li>
            <li><span>Anount:</span> {currencyFormat.format(amount)}</li>
            <li><span>Duration:</span> {running_from}</li>
            <li><span>Reference:</span> <strong>{reference}</strong></li>
          </ul>
        </div>
        
        <ReactMarkdown>{abstract}</ReactMarkdown>
      </section>

      {relevant_outputs.length > 0 ? (
      <section className={styles.Outputs}>
        <h2 className={styles.OutputsTitle}>Outputs</h2>
        <div className={styles.OutputsContent}>
          <ul className={styles.OutputsList}>
            {relevant_outputs.map((output: any) => {
              const {resource_link, resource_name} = output
              return (<li key={resource_link}><Link href={resource_link}><a className={styles.OutputsLink}>{resource_name}</a></Link></li>)
            })}
          </ul>
          <Image src="/images/outputs.svg" width="303" height="220" alt="Relevant Output Resources"/>
        </div>
      </section>
      ) : null}

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
