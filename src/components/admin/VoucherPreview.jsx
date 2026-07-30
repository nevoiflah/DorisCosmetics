import { forwardRef, useEffect, useRef } from 'react';
import { computeVoucherScale } from '../../utils/voucherImage';

const VoucherPreview = forwardRef(function VoucherPreview(
  { recipient, treatment, sender, validity },
  targetRef,
) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    function applyScale() {
      const scale = computeVoucherScale(container);
      target.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    applyScale();
    const observer = new ResizeObserver(applyScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, [targetRef]);

  return (
    <div className="admin-preview-area" ref={containerRef}>
      <div id="voucher-download-target" ref={targetRef}>
        <div className="v-bg" />
        <div className="v-border-inner" />
        <div className="v-corner v-corner-tl" />
        <div className="v-corner v-corner-br" />
        <div className="v-top">
          <img src="/assets/logo.png" className="v-logo-img" alt="" />
          <div className="v-main-title">Gift Card</div>
          <div className="v-sub">A Moment of Beauty</div>
        </div>
        <div className="v-card-body">
          <div className="v-field">
            <div className="v-label">עבור</div>
            <div className="v-value">{recipient || '...'}</div>
          </div>
          <div className="v-field">
            <div className="v-label">פינוק לבחירה</div>
            <div className="v-value">{treatment || '...'}</div>
          </div>
          <div className="v-field" style={{ marginBottom: 0 }}>
            <div className="v-label">באהבה מ...</div>
            <div className="v-value">{sender || '...'}</div>
          </div>
        </div>
        <div className="v-footer-text">
          <div>{validity || '...'}</div>
          <div style={{ marginTop: 20, fontWeight: 700 }}>Dorit Cosmetics</div>
          <div style={{ marginTop: 10, fontSize: 24 }}>סמטת הסחלב 5, גנות הדר</div>
        </div>
      </div>
    </div>
  );
});

export default VoucherPreview;
