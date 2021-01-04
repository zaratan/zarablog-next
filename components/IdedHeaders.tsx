import React, { ReactNode } from 'react';
import slugify from 'slugify';

const toSlug = (content: ReactNode) => slugify(String(content)).toLowerCase();

export const H2 = ({ children }: { children: ReactNode }) => {
  const id = toSlug(children);
  return <h2 id={id}>{children}</h2>;
};

export const H3 = ({ children }: { children: ReactNode }) => {
  const id = toSlug(children);
  return <h3 id={id}>{children}</h3>;
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
