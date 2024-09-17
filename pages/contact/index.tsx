// pages/contact/index.tsx
import {NextPage, GetStaticProps} from "next";
import {useI18N} from 'context/i18n';
import styles from "./Contact.module.css";
import {Hero} from "components/Hero";
import {Footer} from "components/Footer";
import {useState, useEffect} from 'react';

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
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <main className={styles.main}>
        <h1 className={styles.title}>{t('CONTACT')}</h1>
        <form action="https://api.staticforms.xyz/submit" method="post" className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">{t('NAME_LABEL')} <span className={styles.required}>*</span></label>
            <input type="text" id="name" name="name" required className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">{t('EMAIL_LABEL')} <span className={styles.required}>*</span></label>
            <input type="email" id="email" name="email" required className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">{t('PHONE_LABEL')}</label>
            <input type="tel" id="phone" name="phone" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">{t('MESSAGE_LABEL')} <span className={styles.required}>*</span></label>
            <textarea id="message" name="message" required rows={4} className={styles.textarea}></textarea>
          </div>

          <input type="text" name="honeypot" style={{display: 'none'}} />
          <input type="hidden" name="accessKey" value="a3ef2716-4c76-49ba-9a83-9b850c85860e" />
          <input type="hidden" name="subject" value={t('CONTACT_FORM_SUBJECT')} />
          <input type="hidden" name="replyTo" value="@" />
          <input type="hidden" name="redirectTo" value={`${baseUrl}/${t('LOCALE')}/contact/success`} />

          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              {t('SUBMIT_BUTTON')}
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const contentHero = await import(`content/pages/${locale}/home.md`);

  return {props: {contentHero: contentHero.attributes}}
};

export default ContactPage;
