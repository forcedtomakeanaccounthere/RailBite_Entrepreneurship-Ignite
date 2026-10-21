import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { DineInBooking } from './DineInBooking';
import { PickupOrder } from './PickupOrder';
import { SeatDelivery } from './SeatDelivery';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: 'dine' | 'pickup' | 'delivery' | null;
}

export const ServiceModal = ({ isOpen, onClose, serviceType }: ServiceModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Animate modal in
      gsap.fromTo(
        '.modal-content',
        { scale: 0.9, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.modal-backdrop',
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    } else {
      // Restore body scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup on unmount
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen]);

  if (!isOpen || !serviceType) return null;

  const handleClose = () => {
    gsap.to('.modal-content', {
      scale: 0.9,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: onClose,
    });
    gsap.to('.modal-backdrop', {
      opacity: 0,
      duration: 0.3,
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="modal-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div 
        ref={modalRef}
        className="modal-content relative w-full max-w-4xl max-h-[90vh] bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-railway-red scrollbar-track-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 px-8 py-6 flex items-center justify-between">
          <h2 className="font-display font-bold text-3xl text-charcoal">
            {serviceType === 'dine' && 'Reserve a Table'}
            {serviceType === 'pickup' && 'Order for Pickup'}
            {serviceType === 'delivery' && 'Seat Delivery'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100/50 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={28} className="text-charcoal" />
          </button>
        </div>

        <div className="p-8">
          {serviceType === 'dine' && <DineInBooking />}
          {serviceType === 'pickup' && <PickupOrder />}
          {serviceType === 'delivery' && <SeatDelivery />}
        </div>
      </div>
    </div>
  );
};
