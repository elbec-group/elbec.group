import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image"
import path from "path"
import fs from "fs"
import ReactMarkdown from 'react-markdown'
import { useRouter } from "next/router";
import { DEFAULT_LANGUAGE, LOCALES } from "config/index"
import { Project } from 'types/app';
import { useI18N } from "context/i18n";

import styles from "./Project.module.css";

import { Footer } from "components/Footer";
import { HeroImage } from "components/HeroImage";


const Post = ({
  abstract,
  amount,
  currency_type,
  funding_agency,
  image,
  members,
  name,
  pi,
  reference,
  relevant_outputs,
  running_from }: Project) => {

  const { locale } = useRouter();
  const { t } = useI18N();
  // @ts-ignore
  const currencyFormat = new Intl.NumberFormat(LOCALES[locale], { style: 'currency', currency: currency_type })

  return (
    <article className={styles.Wrapper}>
      {image ? (
        <HeroImage image={image.replace('/public', '')} alt={name} />
      ) : null}

      <section className={styles.Content}>
        <h1 className={styles.Title}>{name}</h1>
        <div className={styles.Information}>
          <ul className={styles.InformationList}>
            <li>
              <span>{t('PRINCIPAL_INVESTIGATOR')}:</span> {pi.map(_pi => <Link href="#" key={_pi}><a className={styles.Pi}>{_pi}</a></Link>)}
              {members?.length > 0 ?
                (<> with {members.map((member, i, { length }) => {
                  const SEPARATOR = i === length - 1 ? '' : ', '
                  return (<Link href="#" key={member}><a className={styles.Member}>{`${member}${SEPARATOR}`}</a></Link>)
                })}
                </>) : null}
            </li>

            <li><span>{t('FUNDING_AGENCY')}:</span> {funding_agency}</li>
            <li><span>{t('ANOUNT')}:</span> {currencyFormat.format(amount)}</li>
            <li><span>{t('DURATION')}:</span> {running_from}</li>
            <li><span>{t('REFERENCE')}:</span> <strong>{reference}</strong></li>
          </ul>
        </div>

        <ReactMarkdown>{abstract}</ReactMarkdown>
      </section>

      {relevant_outputs?.length > 0 ? (
        <section className={styles.Outputs}>
          <h2 className={styles.OutputsTitle}>{t('OUTPUTS')}</h2>
          <div className={styles.OutputsContent}>
            <ul className={styles.OutputsList}>
              {relevant_outputs.map((output: any) => {
                const { resource_link, resource_name } = output
                return (<li key={resource_link}><Link href={resource_link}><a className={styles.OutputsLink}>{resource_name}</a></Link></li>)
              })}
            </ul>
            <Image src="/images/outputs.svg" width="303" height="220" alt="Relevant Output Resources" />
          </div>
        </section>
      ) : null}

      <Footer />
    </article>
  );
};


export const getStaticPaths: GetStaticPaths = async ({ locales }: any) => {
  const projectsDirectory = path.join(process.cwd(), `./content/projects/${DEFAULT_LANGUAGE}`)
  const projectsFilenames = fs.readdirSync(projectsDirectory)
  const projectPaths = await Promise.all(projectsFilenames.map(async filename => {
    return `${filename.split('.')[0]}`
  })).then(result => result)
  const paths = locales.map((locale: string) => {
    return projectPaths.map((project: any) => {
      return { params: { project }, locale }
    })
  }).flat();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }: any) => {
  const slug = params.project as string;
  const projectContents = await import(`content/projects/${locale}/${slug}.md`)
  return { props: projectContents.attributes }
};

export default Post;
