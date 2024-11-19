import { useState, useEffect, useCallback } from "react";

// Hook that manages countdown
const useCountdown = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false); // Stop the countdown when it reaches 0
    }

    return () => clearTimeout(timer);
  }, [isActive, seconds]);

  const startCountdown = useCallback(() => {
    setIsActive(true);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  const resetCountdown = useCallback(() => {
    setIsActive(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return {
    seconds,
    isActive,
    startCountdown,
    resetCountdown,
  };
};

export default useCountdown;
