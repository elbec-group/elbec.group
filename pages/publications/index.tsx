import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import path from "path"
import fs from "fs"

import styles from "styles/Home.module.css";
import { Hero } from "components/Hero";
import { Card } from "components/Card";
import { Footer } from "components/Footer";

type Props = {
  contentHero: HomeAttributes;
  publications:Array<Object>
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
  home_title: string;
}

const LANGUAGE = 'en'

const PublicationsPage: NextPage<Props> = ({ publications, contentHero }) => {
  const {
     logo_alt, hero_title, home_title 
  } = contentHero;
  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <article className={styles.content}>
        <section>
          {publications.map((project:any) => {
            const {attributes, slug} = project

            return <Card key={slug} props={attributes} slug={slug}/>
          })}
        </section>
      </article>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contentHero = await import(`content/pages/${LANGUAGE}/home.md`)
  
  const publicationsDirectory = path.join(process.cwd(), `content/publications/${LANGUAGE}`)
  const publicationsFilenames = fs.readdirSync(publicationsDirectory)
  const publications = await Promise.all(publicationsFilenames.map(async filename => {
    const fileContents = await import(`content/publications/${LANGUAGE}/${filename}`)
    return {slug: `/publications/${filename.split('.')[0]}`, attributes: fileContents.attributes}
  })).then (result => result)

  return { props: { publications, contentHero: contentHero.attributes } }
};

export default PublicationsPage;