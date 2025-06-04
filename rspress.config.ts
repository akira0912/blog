import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'akira-blog',
  icon: '/rspress-icon.png',
  base: '/blog/',  // 添加这一行
  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/akira0912',
      },
    ],
  },
  globalStyles: path.join(__dirname, 'styles/index.css'),
});
