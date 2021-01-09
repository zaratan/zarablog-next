import React, { ReactNode } from 'react';
import slugify from 'slugify';

import style from './IdedHeaders.module.scss';

const toSlug = (content: ReactNode) => slugify(String(content)).toLowerCase();

const LinkIcon = ({ id }: { id: string }) => (
  <a href={`#${id}`} className={style.linkA}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={style.linkSvg}
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
        clipRule="evenodd"
      />
    </svg>
  </a>
);

export const H2 = ({ children }: { children: ReactNode }) => {
  const id = toSlug(children);
  return (
    <h2 id={id}>
      {children}
      <LinkIcon id={id} />
    </h2>
  );
};

export const H3 = ({ children }: { children: ReactNode }) => {
  const id = toSlug(children);
  return (
    <h3 id={id}>
      {children}
      <LinkIcon id={id} />
    </h3>
  );
};

export const H4 = ({ children }: { children: ReactNode }) => {
  const id = toSlug(children);
  return <h4 id={id}>{children}</h4>;
};

export const H5 = ({ children }: { children: ReactNode }) => {
  const id = toSlug(children);
  return <h5 id={id}>{children}</h5>;
};

export const H6 = ({ children }: { children: ReactNode }) => {
  const id = toSlug(children);
  return <h6 id={id}>{children}</h6>;
};
