import React, { useEffect, useState } from 'react';
import { Button } from 'react-native';

/**
 * Delay button component
 *
 * @param onPress Processing when the button is pressed after it has been enabled
 * @param delay Number of seconds until the button can be pressed (default 10 seconds)
 */
const DelayButton = ({ onPress, delay = 10 }) => {
  const [count, setCount] = useState(delay);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(false);
    setCount(delay);

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [delay]);

  return (
    <Button
      title={enabled ? 'Next Game' : `Wait ${count}s`}
      onPress={enabled ? onPress : null}
      disabled={!enabled}
    />
  );
};

export default DelayButton;