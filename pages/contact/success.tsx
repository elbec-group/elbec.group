// pages/contact/success.tsx
import {NextPage, GetStaticProps} from "next";
import {useI18N} from 'context/i18n';
import styles from "./Contact.module.css";
import {Hero} from "components/Hero";
import {Footer} from "components/Footer";

type Props = {
  contentHero: HomeAttributes;
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
}

const ContactSuccessPage: NextPage<Props> = ({contentHero}) => {
  const {t} = useI18N();
  const {logo_alt, hero_title} = contentHero;

  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <main className={styles.main}>
        <h1 className={styles.title}>{t('CONTACT_SUCCESS_TITLE')}</h1>
        <p className={styles.successMessage}>{t('CONTACT_SUCCESS_MESSAGE')}</p>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const contentHero = await import(`content/pages/${locale}/home.md`);

  return {props: {contentHero: contentHero.attributes}}
};

export default ContactSuccessPage;
