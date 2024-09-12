import {NextPage, GetStaticProps} from "next";
import Link from "next/link";
import path from "path";
import fs from "fs";
import {useI18N} from 'context/i18n';
import styles from "../../styles/Projects.module.css";
import {Hero} from "components/Hero";
import {Footer} from "components/Footer";

type Props = {
  contentHero: HomeAttributes;
  projects: Project[];
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
}

type Project = {
  id: string;
  name: string;
  abstract: string;
  pi: string[];
  running_from: string;
  slug: string;
}

const ProjectsPage: NextPage<Props> = ({projects, contentHero}) => {
  const {t} = useI18N();
  const {logo_alt, hero_title} = contentHero;

  const projectsByYear = projects.reduce((acc, project) => {
    const year = project.running_from.split('-')[0];
    (acc[year] = acc[year] || []).push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  const sortedYears = Object.keys(projectsByYear).sort((a, b) => b.localeCompare(a));

  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{t('PROJECTS')}</h1>
        {sortedYears.map(year => (
          <section key={year} className={styles.yearSection}>
            <h2 className={styles.yearTitle}>{year}</h2>
            <div className={styles.projectsGrid}>
              {projectsByYear[year].map((project) => (
                <article key={project.id} className={styles.projectCard}>
                  <h3 className={styles.projectTitle}>
                    <Link href={project.slug}>
                      <a className={styles.projectLink}>{project.name}</a>
                    </Link>
                  </h3>
                  <p className={styles.projectAbstract}>{project.abstract}</p>
                  <p className={styles.projectPi}>PI: {project.pi.join(', ')}</p>
                  <Link href={project.slug}>
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

  const projectsDirectory = path.join(process.cwd(), `content/projects/${locale}`);
  const projectsFilenames = fs.readdirSync(projectsDirectory);
  const projects = await Promise.all(projectsFilenames.map(async filename => {
    const fileContents = await import(`content/projects/${locale}/${filename}`);
    return {
      slug: `/projects/${filename.split('.')[0]}`,
      id: filename.split('.')[0],
      ...fileContents.attributes
    };
  }));

  return {props: {projects, contentHero: contentHero.attributes}};
};

export default ProjectsPage;
