import { useState, useRef, useEffect, useCallback } from 'react';

export function useSpeechToText({ lang = 'ar-DZ', onResult }: { lang?: string; onResult?: (t: string) => void } = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setSupported(false); return; }
    const recognition = new SR();
    recognition.lang = lang;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let final = '';
      for (let i = 0; i < event.results.length; i++) final += event.results[i][0].transcript;
      setTranscript(final);
      onResult?.(final);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    return () => { try { recognition.stop(); } catch {} };
  }, [lang, onResult]);

  const start = useCallback(() => {
    if (!recognitionRef.current) return;
    setTranscript('');
    try { recognitionRef.current.start(); setIsListening(true); } catch {}
  }, []);

  const stop = useCallback(() => {
    try { recognitionRef.current?.stop(); } catch {}
    setIsListening(false);
  }, []);

  const toggle = useCallback(() => { isListening ? stop() : start(); }, [isListening, start, stop]);

  return { isListening, transcript, supported, start, stop, toggle };
}