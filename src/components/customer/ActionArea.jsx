import { motion } from 'framer-motion';
import { BUSINESS_PHONE_CLEAN } from '../../constants';

export default function ActionArea() {
  return (
    <motion.div
      className="action-area"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <p className="description">
        המתנה המושלמת למי שאוהבים. <br />
        <strong>הזמינו שובר מתנה דיגיטלי בקלות.</strong>
      </p>
      <motion.a
        href={`https://wa.me/${BUSINESS_PHONE_CLEAN}`}
        className="btn-secondary"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        לתיאום טיפול וייעוץ אישי
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={{ width: 20, height: 20, verticalAlign: 'middle' }}
        />
      </motion.a>
    </motion.div>
  );
}
