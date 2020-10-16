import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

interface SeoProps {
  lang?: string;
  title?: string;
  description?: string;
  image?: string;
  pathname?: string;
}

const Seo: React.FC<SeoProps> = ({ title, description, lang, image, pathname }) => {
  const {
    buildTime,
    pathPrefix,
    siteUrl,
    defaultTitle,
    titleTemplate,
    defaultDescription,
    defaultImage,
    siteLanguage,
    headline,
    author,
    twitter,
  } = useSiteMetadata();

  const seo = {
    lang: lang ?? siteLanguage,
    title: title ?? defaultTitle,
    description: description ?? defaultDescription,
    image: `${siteUrl}${pathPrefix}${image ?? defaultImage}`,
    url: `${siteUrl}${pathname ?? ''}`,
  };

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    'url': siteUrl,
    headline,
    'inLanguage': siteLanguage,
    'mainEntityOfPage': siteUrl,
    'description': defaultDescription,
    'name': defaultTitle,
    'dateModified': buildTime,
    'datePublished': '2020-10-01T10:30:00+00:00',
    'copyrightYear': '2020',
    'copyrightHolder': { '@type': 'Person', 'name': author },
    'author': { '@type': 'Person', 'name': author },
    'creator': { '@type': 'Person', 'name': author },
    'publisher': { '@type': 'Person', 'name': author },
    'image': { '@type': 'ImageObject', 'url': seo.image },
  };

  const itemListElement = [
    {
      '@type': 'ListItem',
      'item': { '@id': siteUrl, 'name': 'Homepage' },
      'position': 1,
    },
  ];

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    'description': 'Breadcrumbs list',
    'name': 'Breadcrumbs',
    itemListElement,
  };

  return (
    <Helmet title={title} defaultTitle={seo.title} titleTemplate={titleTemplate}>
      <html lang={seo.lang} />
      <meta name="description" content={seo.description} />

      {/* OpenGraph tags */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {twitter && <meta name="twitter:creator" content={twitter} />}

      {/* schema.org data
          Always insert breadcrumbs, but article schema only if `articleMeta` is passed
      */}
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <script type="application/ld+json">{JSON.stringify(schemaOrgWebPage)}</script>
    </Helmet>
  );
};

Seo.defaultProps = { lang: 'en' };

export default Seo;
