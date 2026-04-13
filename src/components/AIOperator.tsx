import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAiStore } from '../store/aiStore';

export default function AIOperator() {
  const navigate = useNavigate();
  const { isAiOperating, intent, stopOperation } = useAiStore();

  useEffect(() => {
    if (intent) {
      const lowerIntent = intent.toLowerCase();
      if (lowerIntent.includes('repair')) {
        navigate('/repair');
      } else if (lowerIntent.includes('property-fee')) {
        navigate('/property-fee');
      } else if (lowerIntent.includes('house')) {
        navigate('/house');
      } else if (lowerIntent.includes('family')) {
        navigate('/family');
      } else if (lowerIntent.includes('bill')) {
        navigate('/bills');
      } else if (lowerIntent.includes('invoice')) {
        navigate('/invoices');
      } else if (lowerIntent.includes('message')) {
        navigate('/messages');
      } else if (lowerIntent.includes('setting')) {
        navigate('/settings');
      } else if (lowerIntent.includes('profile')) {
        navigate('/profile');
      } else if (lowerIntent.includes('mine')) {
        navigate('/mine');
      } else if (lowerIntent.includes('home')) {
        navigate('/');
      }
    }
  }, [intent, navigate]);

  if (!isAiOperating) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-green-500/20 pointer-events-none" />
      <button 
        className="fixed top-10 right-4 z-50 pointer-events-auto bg-white text-green-600 px-4 py-2 rounded-full shadow-lg" 
        onClick={stopOperation}
      >
        我自己来操作
      </button>
    </>
  );
}
