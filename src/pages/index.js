import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Form() {
  const [isOnline, setIsOnline] = useState(true);
  const [isVideoWatched, setIsVideoWatched] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

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

  function handleVideoEnd() {
    setIsVideoWatched(true);
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/form', formData)
      .then(() => {
        alert('Form submitted successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert('Error submitting form. Please try again later.');
      });
  }

  return (
    <div className='w-full max-h-screen overflow-hidden flex justify-center items-center'>
      {isOnline && !isVideoWatched && (
        <video src="/add.mp4" autoPlay muted controls={false} width='100%' height='100%' className='w-full' onEnded={handleVideoEnd}></video>
      )}

      {isVideoWatched ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>

          <label>
            Phone Number:
            <input type="number" name="phone" value={formData.phone} onChange={handleChange} />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>

          <button type="submit" >Submit</button>
        </form>
      ) : isOnline ? (
        <h1 className='text-4xl text-center hidden'>Please watch the video to complete the form</h1>
      ) : (
        <h1 className='text-4xl text-center'>You are offline</h1>
      )}
    </div>
  );
}
