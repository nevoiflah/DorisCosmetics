import { useState } from 'react';
import { motion } from 'framer-motion';
import { downloadVoucherImage } from '../../utils/voucherImage';
import { ArrowLeftIcon, DownloadIcon, SpinnerIcon } from '../icons';

export default function AdminControls({
  recipient,
  onRecipientChange,
  treatment,
  onTreatmentChange,
  sender,
  onSenderChange,
  validity,
  onValidityChange,
  targetRef,
  onExit,
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  async function handleDownload() {
    if (!targetRef.current) return;
    setIsDownloading(true);
    try {
      await downloadVoucherImage(targetRef.current, recipient);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="admin-controls-panel">
      <h2 className="form-title">הנפקת שובר חדש</h2>

      <div className="input-group">
        <label className="admin-label">עבור מי השובר?</label>
        <input
          className="admin-input"
          placeholder="שם המקבל/ת"
          value={recipient}
          onChange={(e) => onRecipientChange(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label className="admin-label">סוג הטיפול / סכום</label>
        <div className="quick-select-row">
          <button type="button" className="quick-select-btn" onClick={() => onTreatmentChange('טיפול זוהר')}>
            350₪
          </button>
          <button type="button" className="quick-select-btn" onClick={() => onTreatmentChange('טיפול פרימיום')}>
            450₪
          </button>
        </div>
        <input
          className="admin-input"
          placeholder="או הקלד ידנית..."
          value={treatment}
          onChange={(e) => onTreatmentChange(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label className="admin-label">מאת</label>
        <input
          className="admin-input"
          placeholder="שם השולח/ת"
          value={sender}
          onChange={(e) => onSenderChange(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label className="admin-label">תוקף</label>
        <input className="admin-input" value={validity} onChange={(e) => onValidityChange(e.target.value)} />
      </div>

      <motion.button
        className="btn-primary"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {isDownloading ? <SpinnerIcon className="icon-spin" /> : <DownloadIcon />}
        שמור והורד תמונה
      </motion.button>

      <div className="admin-exit">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onExit();
          }}
        >
          <ArrowLeftIcon />
          יציאה למסך הלקוח
        </a>
      </div>
    </div>
  );
}
