/* eslint-disable */
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import path from "path"
import fs from "fs"

import styles from "../styles/Home.module.css";
import { Hero } from "../components/Hero";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";

type Props = {
  config:{ attributes: ConfigAttributes };
  content: { attributes: HomeAttributes };
  projects:Array<Object>
}

type ConfigAttributes = {
  num_news: number;
  num_projects: number;
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
  home_title: string;
}

const LANGUAGE = 'en'

const HomePage: NextPage<Props> = ({ config, content, projects }) => {
  // console.log({projects})
  const {
    attributes: { logo_alt, hero_title, home_title },
  } = content;
  const { attributes: {num_news = 2, num_projects = 2 }} = config;  

  const newsHome = projects.slice(0, num_news)
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
      <article className={styles.content}>
        <h2>{home_title}</h2>

        {/* <section>
          <h3>News</h3>
          {newsHome.map((project:any) => {
            const {attributes, slug} = project

            return <Card props={attributes} slug={slug} />
          })}
        </section> */}
        <section>
          <h3>Projects</h3>
          {projectsHome.map((project:any) => {
            const {attributes, slug} = project

            return <Card props={attributes} slug={slug}/>
          })}
        </section>
      </article>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const configHome = await import('../content/config/home.md')
  const contentHome = await import(`../content/pages/${LANGUAGE}/home.md`)
  
  const projectsDirectory = path.join(process.cwd(), `./content/projects/${LANGUAGE}`)
  const projectsFilenames = fs.readdirSync(projectsDirectory)
  const projects = await Promise.all(projectsFilenames.map(async filename => {
    const fileContents = await import(`../content/projects/${LANGUAGE}/${filename}`)
    return {slug: `/projects/${filename.split('.')[0]}`, attributes: fileContents.attributes}
  })).then (result => result)

  return { props: { config: configHome.default, content: contentHome.default, projects } }
};

export default HomePage;
/* eslint-enable */
