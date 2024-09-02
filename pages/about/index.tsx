import {NextPage, GetStaticProps} from "next";
import {useI18N} from 'context/i18n';
import styles from "styles/Home.module.css";
import {Hero} from "components/Hero";
import {Footer} from "components/Footer";

type Props = {
  contentHero: HomeAttributes;
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
}

const AboutPage: NextPage<Props> = ({contentHero}) => {
  const {t} = useI18N();
  const {logo_alt, hero_title} = contentHero;

  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <article className={styles.content}>
        <h1>{t('ABOUT')}</h1>
        {/* Aquí puedes añadir el contenido de tu página About */}
        <p>Esta es la página About. Añade aquí la información sobre tu organización o proyecto.</p>
      </article>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const contentHero = await import(`content/pages/${locale}/home.md`);

  return {props: {contentHero: contentHero.attributes}}
};

export default AboutPage;
