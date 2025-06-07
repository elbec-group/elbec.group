import {NextPage, GetStaticProps} from "next";
import Link from "next/link";
import path from "path";
import fs from "fs";
import {useI18N} from 'context/i18n';
import styles from "../../styles/Publications.module.css";
import {Hero} from "components/Hero";
import {Footer} from "components/Footer";

type Props = {
  contentHero: HomeAttributes;
  publications: Publication[];
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
}

type Publication = {
  id: string;
  name: string;
  authors?: string[];
  journal: string;
  year: string;
  doi: string;
  slug: string;
}

const PublicationsPage: NextPage<Props> = ({publications, contentHero}) => {
  const {t} = useI18N();
  const {logo_alt, hero_title} = contentHero;

  const publicationsByYear = publications.reduce((acc, pub) => {
    (acc[pub.year] = acc[pub.year] || []).push(pub);
    return acc;
  }, {} as Record<string, Publication[]>);

  const sortedYears = Object.keys(publicationsByYear).sort((a, b) => b.localeCompare(a));

  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{t('PUBLICATIONS')}</h1>
        {sortedYears.map(year => (
          <section key={year} className={styles.yearSection}>
            <h2 className={styles.yearTitle}>{year}</h2>
            <div className={styles.publicationsGrid}>
              {publicationsByYear[year].map((publication) => (
                <article key={publication.id} className={styles.publicationCard}>
                  <h3 className={styles.publicationTitle}>
                    <Link href={publication.slug}>
                      <a className={styles.publicationLink}>{publication.name}</a>
                    </Link>
                  </h3>
                  <p className={styles.publicationAuthors}>{publication.authors?.join(', ') || ''}</p>
                  <p className={styles.publicationJournal}>{publication.journal}</p>
                  <p className={styles.publicationDoi}>
                    DOI: <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">{publication.doi}</a>
                  </p>
                  <Link href={publication.slug}>
                    <a className={styles.readMoreLink}>{t('READ_MORE')}</a>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const contentHero = await import(`content/pages/${locale}/home.md`);

  const publicationsDirectory = path.join(process.cwd(), `content/publications/${locale}`);
  const publicationsFilenames = fs.readdirSync(publicationsDirectory);
  const publications = await Promise.all(publicationsFilenames.map(async filename => {
    const fileContents = await import(`content/publications/${locale}/${filename}`);
    return {
      slug: `/publications/${filename.split('.')[0]}`,
      id: filename.split('.')[0],
      ...fileContents.attributes
    };
  }));

  return {props: {publications, contentHero: contentHero.attributes}};
};

export default PublicationsPage;
