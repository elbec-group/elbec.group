/* eslint-disable */
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import path from "path"
import fs from "fs"

import styles from "../styles/Home.module.css";
import { Hero } from "../components/Hero.js";
import { Card } from "../components/Card.js";
import { Footer } from "../components/Footer.js";

interface Props {
  contentHome: { attributes: HomeAttributes };
  projects:Array<Object>
}

interface HomeAttributes {
  hero_title: string;
  logo_alt: string;
  home_title: string;
  num_news: number;
  num_projects: number;
}



const PROPS = {
  abstract: 'abstract',
  image: 'image',
  pi: 'pi',
  publication_date: 'publication_date',
  reference: 'reference',
  title: 'title',
}

const LANGUAGE = 'en'

const HomePage: NextPage<Props> = ({ contentHome, projects }) => {
  // projects.map((project:any) => console.log(project))
  const {
    attributes: { logo_alt, hero_title, home_title, num_news = 2, num_projects = 2 },
  } = contentHome;
  
  const projectsHome = projects.slice(0, num_projects)
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
          />
      </Head>
      <Hero title={hero_title} textAlt={logo_alt} isFullHeight/>
      <section className={styles.content}>
        <h2>{home_title}</h2>
        <div>
          {num_news}
        </div>
        <div>
          <h2>Projects</h2>
          {projectsHome.map((project:any) => {
            const {attributes} = project

            return <Card props={attributes} />
          })}
        </div>
      </section>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contentHome = await import(`../content/pages/${LANGUAGE}/home.md`)

  const projectsDirectory = path.join(process.cwd(), `./content/projects/${LANGUAGE}`)
  const projectsFilenames = fs.readdirSync(projectsDirectory)
  const projects = await Promise.all(projectsFilenames.map(async filename => {
    const fileContents = await import(`../content/projects/${LANGUAGE}/${filename}`)
    return fileContents.default
  })).then (result => result)

  return { props: { contentHome: contentHome.default, projects } }
};

export default HomePage;
/* eslint-enable */
