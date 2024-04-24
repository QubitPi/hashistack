/**
 * Copyright 2024 Paion Data. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Immutable Infrastructure as a Service',
  tagline: 'Software exists for humans, not organizations',
  favicon: 'img/favicon.ico',

  url: 'https://immutable-infrastructure.com',
  baseUrl: '/',

  organizationName: 'paion-data',
  projectName: 'immutable-infrastructure-as-a-service',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', "zh-cn"],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/paion-data/immutable-infrastructure-as-a-service/tree/master/docs',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Immutable Infrastructure',
      logo: {
        alt: 'Immutable Infrastructure Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: "localeDropdown",
          position: "left",
        },
        {
          type: 'docSidebar',
          sidebarId: 'docSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/paion-data/immutable-infrastructure-as-a-service',
          label: ' ',
          position: 'right',
          className: 'header-icon-link header-github-link',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Documentation',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discussions',
              href: 'https://github.com/paion-data/immutable-infrastructure-as-a-service/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/paion-data/immutable-infrastructure-as-a-service',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Paion Data. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["java", "bash", "json"]
    },
    algolia: {
      appId: '11324Y7IH1',
      apiKey: '389a0e5d9d57695cf51d6348fdc9b00b',
      indexName: 'immutable-infrastructure-as-a-service'
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
