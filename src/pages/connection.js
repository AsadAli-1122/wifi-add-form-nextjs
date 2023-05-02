import { useEffect, useState } from 'react';

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function handleConnectionChange() {
      setIsOnline(navigator.onLine);
    }
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);

  return (
    <div>
      <h1>{isOnline ? 'Online' : 'Offline'}</h1>
    </div>
  );
}
