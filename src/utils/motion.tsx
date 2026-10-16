import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';

// Check if touch device
const isTouchDevice = () => {
  return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
};

// Check if user prefers reduced motion
const prefersReducedMotion = () => {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// ==========================================
// 1. WORD-BY-WORD & CHARACTER-BY-CHARACTER TEXT REVEAL
// ==========================================
interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  stagger?: number;
  mode?: 'words' | 'chars';
  immediate?: boolean; // For hero initial load
  italicLastWord?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className = '',
  wordClassName = '',
  as = 'h2',
  delay = 0,
  stagger = 0.045,
  mode = 'words',
  immediate = false,
  italicLastWord = false,
}) => {
  if (prefersReducedMotion()) {
    const Component = as;
    return <Component className={className}>{text}</Component>;
  }

  const items = mode === 'words' ? text.split(' ') : text.split('');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 32,
      rotateX: -15,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const Component = motion[as];

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      {...(immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true, margin: '-10% 0px' } })}
      className={`${className} inline-flex flex-wrap justify-center`}
      style={{ perspective: 1000 }}
    >
      {items.map((item, idx) => {
        const isLast = italicLastWord && idx === items.length - 1;
        return (
          <span key={idx} className="overflow-hidden inline-block mr-[0.24em] last:mr-0 py-0.5">
            <motion.span
              variants={itemVariants}
              className={`inline-block will-change-transform ${wordClassName} ${
                isLast ? 'italic text-gold-300 font-light' : ''
              }`}
            >
              {item === ' ' ? '\u00A0' : item}
            </motion.span>
          </span>
        );
      })}
    </Component>
  );
};

// ==========================================
// 2. PARAGRAPH FADE & SLIDE REVEAL
// ==========================================
interface ParagraphRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  immediate?: boolean;
}

export const ParagraphReveal: React.FC<ParagraphRevealProps> = ({
  children,
  className = '',
  delay = 0.2,
  yOffset = 24,
  immediate = false,
}) => {
  if (prefersReducedMotion()) {
    return <p className={className}>{children}</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, filter: 'blur(3px)' }}
      {...(immediate
        ? { animate: { opacity: 1, y: 0, filter: 'blur(0px)' } }
        : {
            whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
            viewport: { once: true, margin: '-8% 0px' },
          })}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// 3. EDITORIAL IMAGE CLIP-PATH REVEAL
// ==========================================
interface ClipRevealImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  direction?: 'bottom' | 'top' | 'left' | 'right';
  delay?: number;
}

export const ClipRevealImage: React.FC<ClipRevealImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  direction = 'bottom',
  delay = 0.1,
}) => {
  if (prefersReducedMotion()) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img src={src} alt={alt} className={imgClassName} />
      </div>
    );
  }

  const clipInitial =
    direction === 'bottom'
      ? 'inset(100% 0% 0% 0%)'
      : direction === 'top'
      ? 'inset(0% 0% 100% 0%)'
      : direction === 'left'
      ? 'inset(0% 100% 0% 0%)'
      : 'inset(0% 0% 0% 100%)';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: clipInitial }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 1.25, delay, ease: [0.19, 1, 0.22, 1] }}
        className="w-full h-full"
      >
        <motion.img
          src={src}
          alt={alt}
          initial={{ scale: 1.15, filter: 'blur(2px)' }}
          whileInView={{ scale: 1.0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1.4, delay, ease: [0.19, 1, 0.22, 1] }}
          className={`w-full h-full object-cover will-change-transform ${imgClassName}`}
        />
      </motion.div>
    </div>
  );
};

// ==========================================
// 4. MAGNETIC BUTTON WRAPPER
// ==========================================
interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0 to 1
  onClick?: () => void;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = '',
  strength = 0.35,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const smoothX = useSpring(position.x, springConfig);
  const smoothY = useSpring(position.y, springConfig);

  useEffect(() => {
    smoothX.set(position.x);
    smoothY.set(position.y);
  }, [position, smoothX, smoothY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice() || prefersReducedMotion()) return;
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: smoothX, y: smoothY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ==========================================
// 5. 3D CARD TILT & SPECULAR GLOSS
// ==========================================
interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  onClick?: () => void;
}

export const Card3DTilt: React.FC<Card3DTiltProps> = ({
  children,
  className = '',
  maxTilt = 7,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice() || prefersReducedMotion() || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1

    const tiltX = (y - 0.5) * -maxTilt * 2;
    const tiltY = (x - 0.5) * maxTilt * 2;

    setTilt({
      x: tiltX,
      y: tiltY,
      glareX: x * 100,
      glareY: y * 100,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt((prev) => ({ ...prev, x: 0, y: 0, isHovered: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative transition-transform duration-300 ease-out ${className}`}
      style={{
        perspective: '1200px',
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {children}

      {/* Dynamic Specular Sheen / Light Reflection */}
      {tilt.isHovered && !isTouchDevice() && (
        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-25 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 260px at ${tilt.glareX}% ${tilt.glareY}%, rgba(223, 186, 115, 0.4), transparent 75%)`,
          }}
        />
      )}
    </div>
  );
};

// ==========================================
// 6. SCROLL PARALLAX LAYER
// ==========================================
interface ScrollParallaxProps {
  children?: React.ReactNode;
  speed?: number; // e.g. -50 to 50
  className?: string;
}

export const ScrollParallax: React.FC<ScrollParallaxProps> = ({
  children = null,
  speed = 40,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const smoothY = useSpring(y, { damping: 20, stiffness: 100 });

  if (prefersReducedMotion()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
};

// ==========================================
// 7. DRIFTING TEA LEAVES CANVAS / SVG ACCENTS
// ==========================================
export const DriftingTeaLeaves: React.FC<{ density?: 'low' | 'medium' }> = ({ density = 'low' }) => {
  if (prefersReducedMotion()) return null;

  const count = density === 'low' ? 5 : 8;

  const leaves = [
    { top: '15%', left: '6%', size: 38, rot: -18, duration: 9, delay: 0 },
    { top: '38%', right: '8%', size: 48, rot: 34, duration: 11, delay: 1.5 },
    { top: '62%', left: '12%', size: 34, rot: -45, duration: 8.5, delay: 3 },
    { top: '78%', right: '14%', size: 44, rot: 22, duration: 10, delay: 2 },
    { top: '24%', right: '28%', size: 30, rot: -10, duration: 12, delay: 4 },
    { top: '85%', left: '32%', size: 36, rot: 50, duration: 9.5, delay: 1 },
    { top: '48%', left: '4%', size: 42, rot: -28, duration: 10.5, delay: 2.5 },
    { top: '10%', right: '18%', size: 32, rot: 15, duration: 11.5, delay: 3.5 },
  ].slice(0, count);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf, idx) => (
        <motion.div
          key={idx}
          className="absolute opacity-30 select-none will-change-transform"
          style={{
            top: leaf.top,
            left: leaf.left,
            right: leaf.right,
          }}
          animate={{
            y: [-12, 14, -12],
            x: [-6, 8, -6],
            rotate: [leaf.rot - 8, leaf.rot + 8, leaf.rot - 8],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 100 100"
            fill="currentColor"
            className="text-sage-400 drop-shadow-md"
          >
            <path d="M10,80 Q25,15 85,15 Q95,65 65,85 Q35,95 10,80 Z" />
            <path d="M10,80 Q50,50 85,15" stroke="#c5a059" strokeWidth="2.5" fill="none" opacity="0.65" />
            <path d="M35,60 Q45,55 50,45" stroke="#c5a059" strokeWidth="1.2" fill="none" opacity="0.4" />
            <path d="M45,45 Q55,42 65,30" stroke="#c5a059" strokeWidth="1.2" fill="none" opacity="0.4" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
