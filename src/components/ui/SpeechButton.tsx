import { Mic, MicOff } from 'lucide-react';
import { useSpeechToText } from '../../hooks/useSpeechToText';

interface Props { onResult: (text: string) => void; className?: string; }

export function SpeechButton({ onResult, className = '' }: Props) {
  const { isListening, toggle, supported } = useSpeechToText({ lang: 'ar-DZ', onResult });
  if (!supported) return null;

  return (
    <button type="button" onClick={toggle}
      className={`${isListening ? 'bg-red-500 recording' : 'bg-blue-500 hover:bg-blue-600'} text-white p-2 rounded-full transition ${className}`}
      title={isListening ? 'إيقاف التسجيل' : 'إدخال صوتي'}>
      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
    </button>
  );
}