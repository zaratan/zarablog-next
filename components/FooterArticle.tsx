import React from 'react';
import { useTranslation } from 'next-i18next';

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
}) => {
  const { t } = useTranslation('article');
  return (
    <p>
      {t('footer.pr')}
      <a
        href={`https://github.com/zaratan/zarablog-next/pull/${prId}`}
        target="_blank"
        rel="noreferrer"
      >
        #{prId}
      </a>
      {t('footer.tea')}
      <a href="https://ko-fi.com/zaratan" target="_blank" rel="noreferrer">
        Ko-fi
      </a>
      .
      {helpers && helpers.length > 0 ? (
        <>
          {t('footer.helpers.thanks')}
          <>
            {helpers.map((helper, i) => (
              <>
                <Helper key={helper.name} helper={helper} />
                {/* eslint-disable-next-line no-nested-ternary */}
                {helpers.length > 1 && i !== helpers.length - 1
                  ? i === helpers.length - 2
                    ? t('footer.helpers.and')
                    : ', '
                  : ''}
              </>
            ))}
          </>
          {t('footer.helpers.for', { count: helpers.length })}
        </>
      ) : (
        ''
      )}
    </p>
  );
};
export default FooterArticle;
