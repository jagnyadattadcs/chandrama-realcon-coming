import React, { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import emailjs from 'emailjs-com';

const EmailForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      await emailjs.send(
        "your_service_id",   // replace with your EmailJS service ID
        "template_32dgvyy",  // replace with your template ID
        {
          to_email: "info@kthsports.in", 
          from_email: email,
          message: "New subscription from website!",
        },
        "QNkwzc5VFpx6MptDS"    // replace with your EmailJS public key
      );

      setStatus("success");
      setMessage("Email sent successfully!");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Failed to send email. Try again.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="relative flex items-center">
            <Mail className="absolute left-4 w-5 h-5 text-amber-300 z-10" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') {
                  setStatus('idle');
                  setMessage('');
                }
              }}
              placeholder="enter your email id"
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-amber-200/70 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading' || !email.trim()}
              className="absolute right-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-md hover:from-orange-400 hover:to-amber-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-300 ${
            status === 'success'
              ? 'bg-amber-500/20 border border-amber-400/30 text-amber-200'
              : 'bg-amber-500/20 border border-amber-400/30 text-amber-200'
          }`}>
            {status === 'success' ? (
              <Check className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{message}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default EmailForm;
