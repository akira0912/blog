// 代码使用普通CSS样式和FontAwesome图标

import React, { useEffect, useRef, useState } from 'react';
import './styles.css'; // 需要创建这个CSS文件
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRobot,
  faPalette,
  faDesktop,
  faCode,
  faShareNodes,
  faEye,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { normalizeImagePath } from 'rspress/runtime';

const App = () => {
  const categories = [
    { name: 'Dify', icon: faRobot, link: '/blog/dify' },
    { name: 'Ant Design', icon: faPalette, link: '/blog/antd-design' },
    { name: '大屏设计', icon: faDesktop, link: '/blog/large-screen' },
    { name: '技术方案', icon: faCode, link: '/blog/project-plan' },
  ];

  const articles = [
    {
      title: 'Dify 智能助手开发实践与经验分享',
      category: 'Dify',
      date: '2024-01-15',
      views: 2341,
      description:
        '探讨如何使用 Dify 快速构建智能对话助手，包含最佳实践和性能优化技巧',
    },
    {
      title: 'Ant Design 5.0 新特性深度解析',
      category: 'Ant Design',
      date: '2024-01-12',
      views: 1892,
      description:
        '详细介绍 Ant Design 5.0 版本的重要更新，组件库的优化与使用技巧',
    },
    {
      title: '大屏可视化设计方法论',
      category: '大屏设计',
      date: '2024-01-10',
      views: 3127,
      description: '分享大屏设计的核心原则、布局技巧和数据可视化最佳实践',
    },
  ];

  const popularTags = [
    { name: 'React', count: 42 },
    { name: 'TypeScript', count: 38 },
    { name: '前端架构', count: 25 },
    { name: '性能优化', count: 31 },
    { name: 'UI设计', count: 28 },
  ];

  return (
    <div className="app-container">
      {/* Hero 区域 */}
      <div className="hero-section">
        <div
          className="hero-background"
          style={{
            backgroundImage: `url('https://ai-public.mastergo.com/ai/img_res/8f9ebc3f9cb4ebeb3ca9da6d48bf2bad.jpg')`,
          }}
        >
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">探索前端技术的无限可能</h1>
                <p className="hero-description">保持浪漫心态 活着就不算坏</p>
                <button
                  className="primary-button"
                  onClick={() => {
                    window.location.href = '#top';
                  }}
                >
                  开始阅读
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div id="top"></div>
      <main className="main-content">
        <div className="content-grid">
          {/* 左侧文章列表 */}
          <div className="articles-section">
            <div className="section-container">
              <h2 className="section-title">最新文章</h2>
              <div className="articles-list">
                {articles.map((article, index) => (
                  <div key={index} className="article-card">
                    <div className="article-meta">
                      <span className="article-date">{article.date}</span>
                      <span className="meta-divider">|</span>
                      <span className="article-category">
                        {article.category}
                      </span>
                      <span className="article-views">
                        <FontAwesomeIcon icon={faEye} className="icon-margin" />
                        {article.views}
                      </span>
                    </div>
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-description">{article.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧边栏 */}
          <div className="sidebar">
            {/* 个人介绍 */}
            <div className="sidebar-card">
              <div className="profile-header">
                <img
                  src={normalizeImagePath("/./e47cc5c12fbbff1c1da5bf83990f29a3.webp")}
                  alt="Avatar"
                  className="profile-avatar"
                />
                <div className="profile-info">
                  <h3 className="profile-name">akira0912</h3>
                  <p className="profile-title">前端开发工程师</p>
                </div>
              </div>
              <p className="profile-bio">
                热爱技术，专注于前端开发和UI设计。致力于分享技术经验，帮助更多开发者成长。
              </p>
            </div>

            {/* 标签云 */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">热门标签</h3>
              <div className="tags-container">
                {popularTags.map((tag, index) => (
                  <button key={index} className="tag-button">
                    {tag.name}
                    <span className="tag-count">{tag.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 分类导航 */}
            <div className="sidebar-card">
              <h3 className="sidebar-title">文章分类</h3>
              <div className="categories-list">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="category-button"
                    onClick={() => {
                      window.location.href = category.link;
                    }}
                  >
                    <FontAwesomeIcon
                      icon={category.icon}
                      className="icon-margin"
                    />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-column">
              <h4 className="footer-title">关于博客</h4>
              <p className="footer-text">
                分享前端技术，记录学习心得，共同成长进步。
              </p>
            </div>
            <div className="footer-column">
              <h4 className="footer-title">友情链接</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">
                  掘金
                </a>
                <a href="#" className="footer-link">
                  GitHub
                </a>
                <a href="#" className="footer-link">
                  知乎
                </a>
              </div>
            </div>
            <div className="footer-column">
              <h4 className="footer-title">联系方式</h4>
              <div className="footer-links">
                <a href="#" className="footer-link">
                  <FontAwesomeIcon icon={faGithub} className="icon-margin" />
                  GitHub
                </a>
                <a href="#" className="footer-link">
                  <FontAwesomeIcon icon={faTwitter} className="icon-margin" />
                  Twitter
                </a>
                <a href="#" className="footer-link">
                  <FontAwesomeIcon icon={faEnvelope} className="icon-margin" />
                  Email
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 akira同学的技术博客. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* 回到顶部按钮 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="back-to-top"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default App;
