const website = require('./config/website');

module.exports = {
  siteMetadata: {
    pathPrefix: website.pathPrefix,
    siteUrl: `${website.url}${website.pathPrefix}`,
    title: website.title,
    titleTemplate: website.titleTemplate,
    description: website.description,
    image: website.image,
    siteLanguage: website.siteLanguage,
    headline: website.headline,
    twitter: website.twitter,
  },
  plugins: ['gatsby-plugin-react-helmet'],
};
