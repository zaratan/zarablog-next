import React from 'react';

type HelperType = {
  name: string;
  link?: string;
};

const Helper = ({ helper }: { helper: HelperType }) => (
  <span>
    {helper.link ? <a href={helper.link}>{helper.name}</a> : helper.name}
  </span>
);

const FooterArticle = ({
  prId,
  helpers,
}: {
  prId: number;
  helpers?: Array<HelperType>;
}) => (
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
    {helpers && helpers.length > 0 ? (
      <>
        {' '}
        Merci à{' '}
        <span>
          {helpers.map((helper, i) => (
            <>
              <Helper key={helper.name} helper={helper} />
              {/* eslint-disable-next-line no-nested-ternary */}
              {helpers.length > 1 && i !== helpers.length - 1
                ? i === helpers.length - 2
                  ? ' et '
                  : ', '
                : ''}
            </>
          ))}
        </span>{' '}
        pour {helpers.length > 1 ? 'leur' : 'sa'} relecture.
      </>
    ) : (
      ''
    )}
  </p>
);

export default FooterArticle;
