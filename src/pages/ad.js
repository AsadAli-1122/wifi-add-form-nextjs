import { useEffect, useState } from 'react';

export default function Ad() {
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
    <div className='w-full max-h-screen overflow-hidden flex justify-center items-center'>
      {isOnline ? (
        <video src="/add.mp4" autoPlay muted controls={false} width='100%' height='100%' className='w-full'></video>
      ) : (
        <h1 className='text-4xl text-center'>You are offline</h1>
      )}
    </div>
  );
}
