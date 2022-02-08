/* eslint-disable */
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";



import styles from "../styles/Home.module.css";
import { Hero } from "../components/Hero.js";
import { Footer } from "../components/Footer.js";

interface Props {
  content: { attributes: HomeAttributes };
}
interface HomeAttributes {
  hero_title: string;
  logo_alt: string;
  home_title: string;
  num_news: number;
  num_projects: number;
}

const LANGUAGE = 'en'

const HomePage: NextPage<Props> = ({ content }) => {
  console.log({content})
  const {
    attributes: { logo_alt, hero_title, home_title, num_news = 2, num_projects = 2 },
  } = content;
  console.log({logo_alt})
  console.log({hero_title})
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
          />
      </Head>
      <Hero title={hero_title} textAlt={logo_alt} />
      <section className={styles.content}>
        <h2>{home_title}</h2>
        <div>
          {num_news}
        </div>
        <div>
          {num_projects}
        </div>
      </section>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const contentHome = await import(`../content/pages/${LANGUAGE}/${"home"}.md`);
  console.log('content', contentHome)
  console.log('attributes', contentHome.attributes)
  console.log('html', contentHome.html)
  console.log('default', contentHome.default)
  return { props: { content: contentHome.default } };
};

export default HomePage;
/* eslint-enable */
