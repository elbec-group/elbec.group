/* eslint-disable */
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import path from "path"
import fs from "fs"
// import { fetchProjectContent } from "../../lib/projects";

import styles from "styles/Home.module.css";

import { Footer } from "components/Footer";

type Props = {
  draft: boolean;
  id: string;
  publication_date: string;
  name: string;
  slug: string;
  image: string;
  reference: string;
  funding_agency: string;
  amout: number;
  running_from: string;
  pi: string[];
  abstract: string;
  photo: string;
  members: string[];
}

const LANGUAGE = 'en'

const Post = ({ draft,
  id,
  publication_date,
  name,
  slug,
  image,
  reference,
  funding_agency,
  amout,
  running_from,
  pi,
  abstract,
  photo,
  members }: Props) => {

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
          />
      </Head>
      <h1>Post</h1>

      <div>
        <p>{draft}</p>
        <p>{id}</p>
        <p>{publication_date}</p>
        <p>{name}</p>
        <p>{slug}</p>
        <p>{image}</p>
        <p>{reference}</p>
        <p>{funding_agency}</p>
        <p>{amout}</p>
        <p>{running_from}</p>
        <p>{pi}</p>
        <p>{abstract}</p>
        <p>{photo}</p>
        <p>{members}</p>
      </div>

      <Footer />
    </>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.project as string;
  const projectContents = await import(`content/projects/${LANGUAGE}/${slug}.md`)
  return {props: projectContents.attributes}
};

export default Post;
/* eslint-enable */
