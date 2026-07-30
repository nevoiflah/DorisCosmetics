import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ADMIN_ACCESS_CODE } from './constants';
import Hero from './components/customer/Hero';
import GiftCardTrigger from './components/customer/GiftCardTrigger';
import ActionArea from './components/customer/ActionArea';
import VoucherModal from './components/customer/VoucherModal';
import Footer from './components/Footer';
import AdminControls from './components/admin/AdminControls';
import VoucherPreview from './components/admin/VoucherPreview';

function useIsAdminRoute() {
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#admin');

  useEffect(() => {
    const handler = () => setIsAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return isAdmin;
}

function enableAdmin() {
  const pass = window.prompt('Access Code?');
  if (pass === ADMIN_ACCESS_CODE) {
    window.location.hash = 'admin';
  }
}

function disableAdmin() {
  window.location.hash = '';
}

function CustomerApp() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="app-shell">
      <main className="container">
        <Hero />
        <section className="gift-section">
          <GiftCardTrigger onOpen={() => setModalOpen(true)} />
          <ActionArea />
        </section>
      </main>
      <Footer onEnableAdmin={enableAdmin} />
      <AnimatePresence>
        {modalOpen && <VoucherModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}

function AdminDashboard() {
  const [recipient, setRecipient] = useState('');
  const [treatment, setTreatment] = useState('');
  const [sender, setSender] = useState('');
  const [validity, setValidity] = useState('מימוש חד פעמי');
  const targetRef = useRef(null);

  return (
    <div className="admin-wrapper">
      <AdminControls
        recipient={recipient}
        onRecipientChange={setRecipient}
        treatment={treatment}
        onTreatmentChange={setTreatment}
        sender={sender}
        onSenderChange={setSender}
        validity={validity}
        onValidityChange={setValidity}
        targetRef={targetRef}
        onExit={disableAdmin}
      />
      <VoucherPreview ref={targetRef} recipient={recipient} treatment={treatment} sender={sender} validity={validity} />
    </div>
  );
}

export default function App() {
  const isAdmin = useIsAdminRoute();

  return (
    <>
      <div className="page-bg" />
      {isAdmin ? <AdminDashboard /> : <CustomerApp />}
    </>
  );
}
