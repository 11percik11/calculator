import StarAnimation from "@/Components/UI/StartAnimation/StartAnimation";
import "./GallerySection.css";
import { useEffect, useRef } from "react";

interface GalleryItem {
  image: string;
}

interface GallerySectionProps {
  title?: string;
  description?: string;
  icons?: GalleryItem[];
}

export const GallerySection = ({
  title = "",
  description = "",
  icons = [],
}: GallerySectionProps) => {
  const galleryItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Инициализация массива refs
    galleryItemsRef.current = galleryItemsRef.current.slice(0, icons.length);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    // Анимация для заголовков
    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          headerObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (headerRef.current) headerObserver.observe(headerRef.current);
    if (titleRef.current) headerObserver.observe(titleRef.current);
    if (descRef.current) headerObserver.observe(descRef.current);

    // Анимация для элементов галереи
    const itemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animated");
          }, 150 * (index % 5));
          itemObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    galleryItemsRef.current.forEach((item) => {
      if (item) itemObserver.observe(item);
    });

    return () => {
      headerObserver.disconnect();
      itemObserver.disconnect();
    };
  }, [icons.length]);

  return (
    <section className="gallery-section">
      <StarAnimation />
      <div className="gallery-header" ref={headerRef}>
        <h2
          className="gallery-title"
          ref={titleRef}
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          {title}
        </h2>
        <p
          className="gallery-description"
          ref={descRef}
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          {description}
        </p>
      </div>

      {/* <div className="gallery-container">
        {icons.map((icon, index) => (
          <div 
            key={index}
            ref={el => {
                if (el) {
                  galleryItemsRef.current[index] = el;
                }
              }}
            className="gallery-item"
            style={{ 
              opacity: 0,
              transform: 'translateY(50px) rotateX(15deg)',
              animationDelay: `${index * 0.05}s`
            }}
          >
            <img 
              src={icon.image} 
              alt={`Gallery item ${index}`} 
              className="gallery-image"
              loading="lazy"
            />
          </div>
        ))}
      </div> */}
      <div className="gallery-container">
        {icons.map((icon, index) => {
          const videoExtensions = [".mp4", ".avi", ".mov", ".webm"];
          const isVideo = videoExtensions.some((ext) =>
            icon.image.toLowerCase().endsWith(ext)
          );

          return (
            <div
              key={index}
              ref={(el) => {
                if (el) galleryItemsRef.current[index] = el;
              }}
              className="gallery-item"
              style={{
                opacity: 0,
                transform: "translateY(50px) rotateX(15deg)",
                animationDelay: `${index * 0.05}s`,
              }}
            >
              {isVideo ? (
                <video
                  src={icon.image}
                  className="gallery-image"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={icon.image}
                  alt={`Gallery item ${index}`}
                  className="gallery-image"
                  loading="lazy"
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
