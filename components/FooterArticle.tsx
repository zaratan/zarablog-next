import React from 'react';

const FooterArticle = ({ prId }: { prId: number }) => (
  <p>
    Pour me poser plus de questions ou réagir à cet article vous pouvez aller
    directement vers la PR correspondante :{' '}
    <a
      href={`https://github.com/zaratan/zarablog-next/pull/${prId}`}
      target="_blank"
      rel="noreferrer"
    >
      #{prId}
    </a>
    . Et si l'article vous a plus vous pouvez toujours m'offrir un thé ici :{' '}
    <a href="https://ko-fi.com/zaratan" target="_blank" rel="noreferrer">
      Ko-fi
    </a>
    .
  </p>
);

export default FooterArticle;
