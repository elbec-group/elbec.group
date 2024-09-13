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

  const truncateBio = (bio: string, limit: number) => {
    const words = bio.split(' ');
    if (words.length > limit) {
      return words.slice(0, limit).join(' ') + '...';
    }
    return bio;
  };

  const renderAuthorCard = (author: Author) => (
    <div key={author.name} className={styles.memberCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={getPlaceholderImage(author.name)}
          alt={author.name}
          width={150}
          height={150}
          className={styles.memberImage}
        />
      </div>
      <h3 className={styles.memberName}>{author.name}</h3>
      {author.bio && (
        <p
          className={styles.memberBio}
          onClick={() => setSelectedAuthor(author)}
        >
          {truncateBio(author.bio, 20)}
        </p>
      )}
      {author.url && (
        <a href={author.url} target="_blank" rel="noopener noreferrer" className={styles.memberLink}>
          {t('VIEW_PROFILE')}
        </a>
      )}
    </div>
  );

  const renderAuthorSection = (role: string) => {
    const filteredAuthors = authors.filter(author => author.role?.toLowerCase().includes(role.toLowerCase()));

    if (filteredAuthors.length === 0) return null;

    return (
      <section className={styles.memberSection}>
        <h2>{t(`ROLE_${role.toUpperCase().replace(' ', '_')}`)}</h2>
        <div className={styles.memberGrid}>
          {filteredAuthors.map(renderAuthorCard)}
        </div>
      </section>
    );
  };

  return (
    <>
      <Hero title={hero_title} textAlt={logo_alt} />
      <article className={styles.content}>
        <section className={styles.mission}>
          <h2>{t('MISSION_TITLE')}</h2>
          <p>{t('MISSION_CONTENT')}</p>
        </section>

        <h1>{t('ABOUT_US')}</h1>

        {renderAuthorSection('Senior researcher')}
        {renderAuthorSection('Junior researcher')}
        {renderAuthorSection('Collaborator')}
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
