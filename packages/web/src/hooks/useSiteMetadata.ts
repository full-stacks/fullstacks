import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(query);
  return { ...site.siteMetadata, buildTime: site.buildTime };
};

const query = graphql`
  query SiteMetadataQuery {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      siteMetadata {
        pathPrefix
        siteUrl
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        defaultImage: image
        siteLanguage
        headline
        # author
        twitter
      }
    }
  }
`;
