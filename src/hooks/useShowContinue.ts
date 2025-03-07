import { useState, useEffect } from "react";

export function useShowContinue(trigger: boolean) {
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        setShowContinue(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
    setShowContinue(false);
  }, [trigger]);

  useEffect(() => {
    const handleResume = () => {
      setShowContinue(false);
    };
    window.addEventListener("resumeConversation", handleResume);
    return () => {
      window.removeEventListener("resumeConversation", handleResume);
    };
  }, []);

  return { showContinue, setShowContinue };
}
