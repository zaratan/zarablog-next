import React from 'react';
import { FaEnvelope, FaGithub, FaTwitter, FaMugHot } from 'react-icons/fa';
import Image from 'next/image';

import styles from './Profile.module.scss';

const ImgProfilePic = () => (
  <div className={styles.pictureContainer}>
    <Image src="/profile.jpg" width="200" height="200" />
  </div>
);

const Profile = () => (
  <div className={styles.profileContainer}>
    <ImgProfilePic />
    <header>
      <h1>Zaratan</h1>
      <h3>Les élucubrations d'un développeur fatigué</h3>
      <p>
        Développeur, ludiste, admin sys, grimpeur et cuisinier à mes heures. Je
        suis curieux de tout, tout le temps. J’aime découvrir de nouvelles
        choses et les partager.
      </p>
    </header>
    <section>
      <h2>Me contacter</h2>
      <ul>
        <li>
          <FaEnvelope />
          <span className={styles.space} />
          <a
            href="mailto:zaratan@hey.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            zaratan@hey.com
          </a>
        </li>
        <li>
          <FaGithub />
          <span className={styles.space} />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/zaratan"
          >
            zaratan
          </a>
        </li>
        <li>
          <FaTwitter />
          <span className={styles.space} />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/zaratan"
          >
            @zaratan
          </a>
        </li>
      </ul>
    </section>
    <section>
      <h2>Me soutenir</h2>
      <ul>
        <li>
          <FaMugHot />
          <span className={styles.space} />
          <a
            href="https://ko-fi.com/zaratan"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ko-Fi
          </a>
        </li>
      </ul>
    </section>
  </div>
);

export default Profile;
