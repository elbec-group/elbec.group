import {NextPage, GetStaticProps} from "next";
import path from "path"
import fs from "fs"
import {useI18N} from 'context/i18n';
import styles from "../../styles/Projects.module.css"
import {Hero} from "components/Hero";
import {Card} from "components/Card";
import {Footer} from "components/Footer";

type Props = {
  contentHero: HomeAttributes;
  projects: Array<Object>
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
}

const ProjectsPage: NextPage<Props> = ({projects, contentHero}) => {
  const {t} = useI18N();
  const {logo_alt, hero_title} = contentHero;

  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>{t('PROJECTS')}</h1>
        <ul className={styles.projectsList}>
          {projects.map((project: any) => {
            const {attributes, slug} = project
            return (
              <li key={slug} className={styles.projectItem}>
                <Card props={attributes} slug={slug} />
              </li>
            );
          })}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const contentHero = await import(`content/pages/${locale}/home.md`)

  const projectsDirectory = path.join(process.cwd(), `content/projects/${locale}`)
  const projectsFilenames = fs.readdirSync(projectsDirectory)
  const projects = await Promise.all(projectsFilenames.map(async filename => {
    const fileContents = await import(`content/projects/${locale}/${filename}`)
    return {slug: `/projects/${filename.split('.')[0]}`, attributes: fileContents.attributes}
  })).then(result => result)

  return {props: {projects, contentHero: contentHero.attributes}}
};

export default ProjectsPage;
