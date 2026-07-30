import { BUSINESS_PHONE_CLEAN } from '../constants';

export function buildOrderWhatsAppUrl({ sender, phone, recipient, amount, treatment }) {
  const text = `היי דורית,\nביצעתי עכשיו העברה בביט על סך ₪${amount} עבור ${treatment}.\n\nפרטי השובר:\nמאת: ${sender} (טלפון: ${phone})\nעבור: ${recipient}\n\nאשמח לקבל את השובר הדיגיטלי! תודה.`;

  return `https://wa.me/${BUSINESS_PHONE_CLEAN}?text=${encodeURIComponent(text)}`;
}
