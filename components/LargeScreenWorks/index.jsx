import React, { useState, useEffect } from 'react';
import { works } from './options';
import './styles.css';
// 导入 Font Awesome 组件
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// 导入需要的图标
import { faArrowUp, faTimes, faImage, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { normalizeImagePath } from 'rspress/runtime';

const DigitalScreenGallery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const openPreview = (work) => {
    setPreviewImage(work);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="gallery-container">
      {/* 主要内容区 */}
      <main className="main-content">
        {/* 作品展示区 */}
        <div className="works-grid">
          {works.map((work) => (
            <div
              key={work.id}
              className="work-card"
              onClick={() => openPreview(work)}
            >
              <div className="image-container">
                {!loadedImages[work.id] && (
                  <div className="image-placeholder animate-pulse">
                    {/* 替换 Font Awesome 图标 */}
                    <FontAwesomeIcon icon={faImage} className="image-placeholder-icon" />
                  </div>
                )}
                <img
                  src={normalizeImagePath(work.imageUrl)}
                  alt={work.title}
                  className="work-image"
                  onLoad={() => handleImageLoad(work.id)}
                  loading="lazy"
                />
              </div>
              <div className="work-content">
                <h3 className="work-title">{work.title}</h3>
                <p className="work-description">{work.description}</p>
                <div className="tags-container">
                  {work.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 加载更多 */}
        <div className="load-more">
          <button className="button button-secondary">
            {/* 替换 Font Awesome 图标 */}
            <FontAwesomeIcon icon={faSyncAlt} style={{ marginRight: '0.5rem' }} />
            加载更多作品
          </button>
        </div>
      </main>

      {/* 返回顶部按钮 */}
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        {/* 替换 Font Awesome 图标 */}
        <FontAwesomeIcon icon={faArrowUp} />
      </button>

      {/* 图片预览模态框 */}
      {previewImage && (
        <div className="image-preview-modal" onClick={closePreview}>
          <div className="image-preview-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePreview}>
              {/* 替换 Font Awesome 图标 */}
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <img 
              src={previewImage.imageUrl} 
              alt={previewImage.title} 
              className="preview-image" 
            />
            <div className="preview-info">
              <h2 className="preview-title">{previewImage.title}</h2>
              <p className="preview-description">{previewImage.description}</p>
              <div className="preview-tags">
                {previewImage.tags.map((tag) => (
                  <span key={tag} className="preview-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalScreenGallery;
