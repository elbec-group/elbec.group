import { NextPage, GetStaticProps } from "next";
//import Head from "next/head";
import path from "path"
import fs from "fs"

import styles from "styles/Home.module.css";
import { Hero } from "components/Hero";
import { Card } from "components/Card";
import { Footer } from "components/Footer";

type Props = {
  contentHero: HomeAttributes;
  projects: Array<Object>
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
  home_title: string;
}

const ProjectsPage: NextPage<Props> = ({ projects, contentHero }) => {
  const {
    logo_alt, hero_title
  } = contentHero;
  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <article className={styles.content}>
        <section>
          {projects.map((project: any) => {
            const { attributes, slug } = project

            return <Card key={slug} props={attributes} slug={slug} />
          })}
        </section>
      </article>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const contentHero = await import(`content/pages/${locale}/home.md`)

  const projectsDirectory = path.join(process.cwd(), `content/projects/${locale}`)
  const projectsFilenames = fs.readdirSync(projectsDirectory)
  const projects = await Promise.all(projectsFilenames.map(async filename => {
    const fileContents = await import(`content/projects/${locale}/${filename}`)
    return { slug: `/projects/${filename.split('.')[0]}`, attributes: fileContents.attributes }
  })).then(result => result)

  return { props: { projects, contentHero: contentHero.attributes } }
};

export default ProjectsPage;
