import { motion } from 'framer-motion';

export default function Footer({ onEnableAdmin }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="footer-address">סמטת הסחלב 5, גנות הדר 📍</div>
      <p>MOMENTS OF BEAUTY</p>
      <div className="admin-trigger" onClick={onEnableAdmin}>π</div>
    </motion.footer>
  );
}
