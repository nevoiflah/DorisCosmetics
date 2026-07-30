import { useState } from 'react';
import { motion } from 'framer-motion';
import { TREATMENT_OPTIONS, DEFAULT_TREATMENT, BUSINESS_PHONE } from '../../constants';
import { buildOrderWhatsAppUrl } from '../../utils/whatsapp';
import { CloseIcon } from '../icons';

const contentVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 24, staggerChildren: 0.06, delayChildren: 0.05 },
  },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function VoucherModal({ onClose }) {
  const [selectedTreatment, setSelectedTreatment] = useState(DEFAULT_TREATMENT);
  const [sender, setSender] = useState('');
  const [phone, setPhone] = useState('');
  const [recipient, setRecipient] = useState('');

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  async function handleBitPayment() {
    try {
      await navigator.clipboard.writeText(BUSINESS_PHONE);
      alert(`המספר ${BUSINESS_PHONE} הועתק! עובר לאפליקציית ביט...`);
    } catch {
      // Clipboard unavailable — still proceed to the app.
    } finally {
      window.location.href = 'https://www.bitpay.co.il/app';
    }
  }

  function handleSendWhatsApp() {
    if (!sender || !recipient) {
      alert('אנא מלאו פרטים מלאים');
      return;
    }
    const url = buildOrderWhatsAppUrl({
      sender,
      phone,
      recipient,
      amount: selectedTreatment.price,
      treatment: selectedTreatment.name,
    });
    window.open(url, '_blank');
  }

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleOverlayClick}
    >
      <motion.div className="modal-content" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
        <button className="close-btn" onClick={onClose} aria-label="סגירה">
          <CloseIcon />
        </button>
        <motion.h3 className="modal-title" variants={fieldVariants}>רכישת שובר מתנה</motion.h3>

        <motion.div className="form-section" variants={fieldVariants}>
          <label className="form-section-label">בחרו סכום:</label>
          <div className="options-grid">
            {TREATMENT_OPTIONS.map((opt) => {
              const selected = opt.name === selectedTreatment.name;
              return (
                <motion.div
                  key={opt.name}
                  className="option-card"
                  onClick={() => setSelectedTreatment(opt)}
                  animate={{
                    borderColor: selected ? '#b78628' : '#eeeeee',
                    backgroundColor: selected ? '#fffcf5' : '#ffffff',
                    scale: selected ? 1.04 : 1,
                    boxShadow: selected
                      ? '0 6px 16px rgba(183, 134, 40, 0.18)'
                      : '0 0px 0px rgba(183, 134, 40, 0)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <span className="opt-name">{opt.name}</span>
                  <span className="opt-price">₪{opt.price}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div className="form-section" variants={fieldVariants}>
          <input
            className="input-field"
            placeholder="שם השולח/ת"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
          <input
            className="input-field"
            type="tel"
            placeholder="טלפון שלך"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="input-field"
            placeholder="שם המקבל/ת"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </motion.div>

        <motion.div className="modal-actions" variants={fieldVariants}>
          <motion.button
            className="btn-bit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBitPayment}
          >
            תשלום ב-Bit (העתק מספר ופתח אפליקציה)
          </motion.button>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSendWhatsApp}
          >
            שילמתי! שלח הודעה וקבלת שובר
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
