// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'lab.jaouan.dev',
  tagline: 'Labosaurus',
  favicon: 'img/favicon.ico',
  url: 'https://lab.jaouan.dev',
  baseUrl: '/',
  organizationName: 'Jaouan',
  projectName: 'labosaurus',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        theme: {
          customCss: './src/theme/theme.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'lab.jaouan.dev',
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Demo',
          },
          {
            href: 'https://github.com/Jaouan/labosaurus',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://github.com/Jaouan/labosaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        copyright: `Made with 🦖 — ${new Date().getFullYear()} Maxence Jaouan`,
      },
      prism: {
        additionalLanguages: ['bash'],
        theme: prismThemes.dracula,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
