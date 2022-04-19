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
  resources:Array<Object>
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
  home_title: string;
}

const ResourcesPage: NextPage<Props> = ({ resources, contentHero }) => {
  const {
     logo_alt, hero_title, home_title 
  } = contentHero;
  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <h1>Resources</h1>
      <article className={styles.content}>
        <section>
          {resources.map((resource:any) => {
            const {attributes, slug} = resource

            return //<Card key={slug} props={attributes} slug={slug}/>
          })}
        </section>
      </article>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const contentHero = await import(`content/pages/${locale}/home.md`)
  
  const resourcesDirectory = path.join(process.cwd(), `content/resources/${locale}`)
  const resourcesFilenames = fs.readdirSync(resourcesDirectory)
  const resources = await Promise.all(resourcesFilenames.map(async filename => {
    const fileContents = await import(`content/resources/${locale}/${filename}`)
    return {slug: `/resources/${filename.split('.')[0]}`, attributes: fileContents.attributes}
  })).then (result => result)

  return { props: { resources, contentHero: contentHero.attributes } }
};

export default ResourcesPage;