import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function GiftCardTrigger({ onOpen }) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);
  const shineX = useTransform(x, (v) => `${v * 100}%`);
  const shineY = useTransform(y, (v) => `${v * 100}%`);

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <div className="gift-card-container" onClick={onOpen}>
      <motion.div
        className="gift-card"
        style={{ rotateX, rotateY, '--shine-x': shineX, '--shine-y': shineY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      >
        <div className="card-content">
          <div className="card-logo-small">Dorit Cosmetics</div>
          <h2 className="card-title">Gift Card</h2>
          <p className="card-text">רגע של רוגע מתנה עבורך</p>
        </div>
        <div className="card-shine" />
      </motion.div>
      <motion.div
        className="click-hint"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        לחצו לרכישת שובר מתנה
      </motion.div>
    </div>
  );
}
