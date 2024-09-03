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

const ContactPage: NextPage<Props> = ({contentHero}) => {
  const {t} = useI18N();
  const {logo_alt, hero_title} = contentHero;

  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <article className={styles.content}>
        <h1>{t('CONTACT')}</h1>
        {/* Aquí puedes añadir el contenido de tu página de contacto */}
        <p>Esta es la página de contacto. Añade aquí tu información de contacto o un formulario.</p>
      </article>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const contentHero = await import(`content/pages/${locale}/home.md`);

  return {props: {contentHero: contentHero.attributes}}
};

export default ContactPage;
