import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.header
      className="hero"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="logo-container">
        <motion.img
          src="/assets/logo.png"
          alt="Dorit Cosmetics Logo"
          className="logo"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <h1 className="brand-name">Dorit Cosmetics</h1>
      <p className="tagline">קליניקה פרטית לאסתטיקה ויופי</p>
    </motion.header>
  );
}
