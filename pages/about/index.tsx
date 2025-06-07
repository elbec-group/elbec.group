import React, {useState} from 'react';
import {NextPage, GetStaticProps} from "next";
import {useI18N} from 'context/i18n';
import styles from "./About.module.css";
import {Hero} from "components/Hero";
import {Footer} from "components/Footer";
import Image from "next/image";
import fs from 'fs';
import path from 'path';
import BioModal from 'components/BioModal';

type Props = {
  contentHero: HomeAttributes;
  authors: Author[];
}

type HomeAttributes = {
  hero_title: string;
  logo_alt: string;
}

type Author = {
  order: number;
  name: string;
  photo: string;
  role: string;
  url?: string;
  bio?: string | null;
};

const AboutPage: NextPage<Props> = ({contentHero, authors}) => {
  const {t} = useI18N();
  const {logo_alt, hero_title} = contentHero;
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const getPlaceholderImage = (name: string) => {
    return `https://placehold.co/300x300?text=${name.charAt(0)}`;
  };

  const renderAuthorCard = (author: Author) => (
    <div key={author.name} className={styles.memberCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={author.photo || getPlaceholderImage(author.name)}
          alt={author.name}
          width={150}
          height={150}
          className={styles.memberImage}
        />
      </div>
      <h3
        className={styles.memberName}
        onClick={() => setSelectedAuthor(author)}
      >
        {author.name}
      </h3>
      <p className={styles.memberRole}>{t(`ROLE_${author.role.toUpperCase()}`)}</p>
      {author.url && (
        <a href={author.url} target="_blank" rel="noopener noreferrer" className={styles.memberLink}>
          {t('LEARN_MORE')}
        </a>
      )}
    </div>
  );

  const renderAuthorSection = (role: string) => {
    const filteredAuthors = authors.filter(author => author.role === role);
    filteredAuthors.sort((a, b) => a.order - b.order);

    if (filteredAuthors.length === 0) return null;

    return (
      <section className={styles.memberSection}>
        <h2>{t(`ROLE_${role.toUpperCase()}`)}</h2>
        <div className={styles.memberGrid}>
          {filteredAuthors.map((author) => renderAuthorCard(author))}
        </div>
      </section>
    );
  };

  const roles = ['senior_researcher', 'junior_researcher', 'phd_student', 'collaborator', 'project_assistant', 'research_group_member'];

  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <article className={styles.content}>
        <section className={styles.mission}>
          <h2 className={styles.sectionTitle}>{t('MISSION_TITLE')}</h2>
          <p>{t('MISSION_CONTENT')}</p>
        </section>

        <section className={styles.aboutUs}>
          <h2 className={styles.sectionTitle}>{t('ABOUT_US')}</h2>
        </section>

        {roles.map(role => renderAuthorSection(role))}
      </article>
      <Footer />
      {selectedAuthor && (
        <BioModal
          author={selectedAuthor}
          onClose={() => setSelectedAuthor(null)}
        />
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({locale}) => {
  const contentHero = await import(`content/pages/${locale}/home.md`);
  const authorsDirectory = path.join(process.cwd(), `content/authors/${locale}`);
  const authorFiles = fs.readdirSync(authorsDirectory);

  const authors = await Promise.all(authorFiles.map(async (filename) => {
    const authorContent = await import(`content/authors/${locale}/${filename}`);
    return authorContent.attributes;
  }));

  return {
    props: {
      contentHero: contentHero.attributes,
      authors: authors
    }
  };
};

export default AboutPage;
