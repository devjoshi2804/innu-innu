import { useEffect } from 'react';
import gsap from 'gsap';

export default function Home() {
  useEffect(() => {
    // ... existing Three.js setup ...

    // Modified submit handler
    const handleSubmit = async () => {
      const name = document.getElementById('guest-name')?.value;
      const contact = document.getElementById('guest-contact')?.value;
      const submitBtn = document.getElementById('submit-rsvp');

      if (!name || !contact) {
        alert('Please fill in both fields ✨');
        return;
      }

      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const response = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, contact })
        });

        const responseData = await response.json();
        
        if (!response.ok || !responseData.success) {
          throw new Error(responseData.message || 'Failed to send RSVP');
        }

        // Success handling
        const modal = document.getElementById('rsvp-modal');
        modal.style.display = 'none';
        
        const sparkles = document.createElement('div');
        sparkles.className = 'confetti';
        document.body.appendChild(sparkles);
        
        gsap.to('#sweet-message', {
          duration: 1,
          opacity: 1,
          scale: 1,
          ease: "elastic.out(1, 0.3)"
        });

        alert('Thank you for your RSVP! We can\'t wait to see you at Alegría! 🎭✨');
        
        setTimeout(() => sparkles.remove(), 2000);
      } catch (error) {
        console.error('Error:', error);
        alert('Oops! Something went wrong. Please try again! 🌟');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Confirm RSVP ✨';
      }
    };

    // Attach event listener
    document.getElementById('submit-rsvp')?.addEventListener('click', handleSubmit);

    return () => {
      document.getElementById('submit-rsvp')?.removeEventListener('click', handleSubmit);
    };
  }, []);

  // ... rest of the component ...
} 