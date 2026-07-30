import html2canvas from 'html2canvas';

const VOUCHER_WIDTH = 1080;
const VOUCHER_HEIGHT = 1920;

export function computeVoucherScale(containerEl) {
  if (!containerEl) return 1;
  const w = containerEl.offsetWidth - 40;
  const h = containerEl.offsetHeight - 40;
  return Math.min(w / VOUCHER_WIDTH, h / VOUCHER_HEIGHT);
}

export async function downloadVoucherImage(targetEl, recipientName) {
  const originalTransform = targetEl.style.transform;
  const originalPosition = targetEl.style.position;
  const originalTop = targetEl.style.top;
  const originalLeft = targetEl.style.left;
  const originalZIndex = targetEl.style.zIndex;

  targetEl.style.transform = 'none';
  targetEl.style.position = 'fixed';
  targetEl.style.top = '0';
  targetEl.style.left = '0';
  targetEl.style.zIndex = '-9999';

  try {
    const canvas = await html2canvas(targetEl, {
      scale: 1,
      useCORS: true,
      backgroundColor: null,
      width: VOUCHER_WIDTH,
      height: VOUCHER_HEIGHT,
      windowWidth: VOUCHER_WIDTH,
      windowHeight: VOUCHER_HEIGHT,
    });

    const link = document.createElement('a');
    link.download = `DoritCosmetics-${recipientName || 'GiftCard'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } finally {
    targetEl.style.transform = originalTransform;
    targetEl.style.position = originalPosition;
    targetEl.style.top = originalTop;
    targetEl.style.left = originalLeft;
    targetEl.style.zIndex = originalZIndex;
  }
}
