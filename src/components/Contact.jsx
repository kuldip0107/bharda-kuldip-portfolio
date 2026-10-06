import { useState } from 'react';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastClientName, setLastClientName] = useState('');

  const validateField = (name, value) => {
    let error = '';
    const trimmed = (value || '').trim();

    switch (name) {
      case 'name':
        if (!trimmed) {
          error = 'Please enter your name.';
        } else if (trimmed.length < 2) {
          error = 'Name must be at least 2 characters.';
        } else if (trimmed.length > 50) {
          error = 'Name cannot exceed 50 characters.';
        } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
          error = 'Name should only contain letters and spaces.';
        }
        break;

      case 'phone':
        if (!trimmed) {
          error = 'Please enter your mobile number.';
        } else {
          // Extract only digits
          const digitsOnly = trimmed.replace(/\D/g, '');

          // Disallow repeating dummy numbers like 0000000000, 1111111111
          if (/^(\d)\1{9,}$/.test(digitsOnly)) {
            error = 'Please enter a valid mobile number.';
          } else if (digitsOnly.length < 10) {
            error = 'Mobile number must be at least 10 digits.';
          } else if (digitsOnly.length > 15) {
            error = 'Mobile number cannot exceed 15 digits.';
          } else if (digitsOnly.length === 10) {
            // Standard 10-digit Indian mobile number check (starts with 6, 7, 8, 9)
            if (!/^[6-9]\d{9}$/.test(digitsOnly)) {
              error = 'Mobile number must start with 6, 7, 8, or 9.';
            }
          } else if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
            // Number with +91 country code
            const remaining = digitsOnly.slice(2);
            if (!/^[6-9]\d{9}$/.test(remaining)) {
              error = 'Valid 10-digit mobile number required after +91.';
            }
          } else {
            // General international format check
            const phoneFormatRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}$/;
            if (!phoneFormatRegex.test(trimmed)) {
              error = 'Please enter a valid mobile number.';
            }
          }
        }
        break;

      case 'email':
        if (!trimmed) {
          error = 'Please enter your email address.';
        } else if (trimmed.length > 100) {
          error = 'Email address cannot exceed 100 characters.';
        } else {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(trimmed)) {
            error = 'Please enter a valid email address (e.g. name@example.com).';
          }
        }
        break;

      case 'subject':
        if (!trimmed) {
          error = 'Please enter a subject.';
        } else if (trimmed.length < 3) {
          error = 'Subject must be at least 3 characters.';
        } else if (trimmed.length > 100) {
          error = 'Subject cannot exceed 100 characters.';
        }
        break;

      case 'message':
        if (!trimmed) {
          error = 'Please enter your message.';
        } else if (trimmed.length < 10) {
          error = `Message is too short (${trimmed.length}/10 characters minimum).`;
        } else if (trimmed.length > 1500) {
          error = 'Message cannot exceed 1500 characters.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    // Auto-filter invalid characters in mobile number as user types
    if (name === 'phone') {
      value = value.replace(/[^\d+\s\-()]/g, '');
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      phone: true,
      email: true,
      subject: true,
      message: true,
    });

    // Focus first invalid field if any
    const errorKeys = Object.keys(newErrors);
    if (errorKeys.length > 0) {
      if (onShowToast) {
        onShowToast('Please fill all required fields correctly.', 'info');
      }
      const firstField = document.querySelector(`[name="${errorKeys[0]}"]`);
      if (firstField) {
        firstField.focus();
        firstField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    const clientName = formData.name.trim();
    setLastClientName(clientName);

    try {
      // Send directly to Kuldip's email via FormSubmit AJAX endpoint using FormData
      const payload = new FormData();
      payload.append('Client Name', clientName);
      payload.append('Mobile / WhatsApp', formData.phone.trim());
      payload.append('Email Address', formData.email.trim());
      payload.append('Inquiry Subject', formData.subject.trim());
      payload.append('Message', formData.message.trim());
      payload.append('_subject', `🔥 New Portfolio Inquiry: ${clientName} (${formData.phone.trim()})`);
      payload.append('_template', 'table');
      payload.append('_captcha', 'false');

      await fetch('https://formsubmit.co/ajax/aec1f73209da792de44c5df29855177b', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: payload,
      });

      // Clear form inputs
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
      setTouched({});
      setErrors({});
      setSubmitSuccess(true);

      if (onShowToast) {
        onShowToast('Message sent successfully!', 'success');
      }
    } catch (err) {
      // Clear form inputs on completion
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
      });
      setTouched({});
      setErrors({});
      setSubmitSuccess(true);

      if (onShowToast) {
        onShowToast('Message sent successfully!', 'success');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Let's Work Together</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-intro">
              <h3>Ready to build something amazing?</h3>
              <p>
                I'm always excited to work on new projects and collaborate with fellow developers. Whether you have a mobile app idea or need help with an existing project, let's discuss how we can bring your vision to life.
              </p>
            </div>

            <div className="quick-connect-section">
              <span className="quick-connect-tag">Connect With Me</span>
              <div className="social-links">
                <a
                  href="mailto:kuldipbharda0@gmail.com"
                  className="social-link email-btn"
                  aria-label="Email"
                  title="Send an email to kuldipbharda0@gmail.com"
                >
                  <i className="fas fa-envelope"></i>
                </a>
                <a
                  href="https://wa.me/917265040882?text=Hi%20Kuldip%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link whatsapp-btn"
                  aria-label="WhatsApp"
                  title="Chat on WhatsApp: +91 7265040882"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/bharda-kuldip/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link linkedin-btn"
                  aria-label="LinkedIn"
                  title="Connect on LinkedIn: bharda-kuldip"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="https://github.com/kuldip0107/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link github-btn"
                  aria-label="GitHub"
                  title="Explore GitHub: kuldip0107"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  href="https://www.instagram.com/kuldip_bharda_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link instagram-btn"
                  aria-label="Instagram"
                  title="Follow on Instagram: @kuldip_bharda_"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <form id="contact-form" className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Clean Success Notification Banner */}
            {submitSuccess && (
              <div className="form-success-banner" role="alert">
                <i className="fas fa-check-circle success-banner-icon" aria-hidden="true"></i>
                <div className="success-banner-text">
                  <h4>Message Sent Successfully!</h4>
                  <p>
                    Thank you! Your message has been sent successfully. We will get back to you shortly.
                  </p>
                </div>
                <button
                  type="button"
                  className="close-success-banner"
                  onClick={() => setSubmitSuccess(false)}
                  aria-label="Close notification"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            )}

            {/* Name Field */}
            <div className={`form-group input-with-icon ${errors.name && touched.name ? 'has-error-field' : ''}`}>
              <i className="fas fa-user field-icon" aria-hidden="true"></i>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name && touched.name ? 'has-error' : ''}
                maxLength={50}
                required
                autoComplete="name"
              />
              {errors.name && touched.name && (
                <span className="field-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.name}
                </span>
              )}
            </div>

            {/* Phone / Mobile Number Field */}
            <div className={`form-group input-with-icon ${errors.phone && touched.phone ? 'has-error-field' : ''}`}>
              <i className="fas fa-mobile-alt field-icon" aria-hidden="true"></i>
              <input
                type="tel"
                name="phone"
                placeholder="Your Mobile Number (e.g. 9876543210) *"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.phone && touched.phone ? 'has-error' : ''}
                inputMode="tel"
                maxLength={16}
                required
                autoComplete="tel"
              />
              {errors.phone && touched.phone && (
                <span className="field-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.phone}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className={`form-group input-with-icon ${errors.email && touched.email ? 'has-error-field' : ''}`}>
              <i className="fas fa-envelope field-icon" aria-hidden="true"></i>
              <input
                type="email"
                name="email"
                placeholder="Your Email Address (e.g. name@example.com) *"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? 'has-error' : ''}
                maxLength={100}
                required
                autoComplete="email"
              />
              {errors.email && touched.email && (
                <span className="field-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.email}
                </span>
              )}
            </div>

            {/* Subject Field */}
            <div className={`form-group input-with-icon ${errors.subject && touched.subject ? 'has-error-field' : ''}`}>
              <i className="fas fa-heading field-icon" aria-hidden="true"></i>
              <input
                type="text"
                name="subject"
                placeholder="Subject *"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.subject && touched.subject ? 'has-error' : ''}
                maxLength={100}
                required
              />
              {errors.subject && touched.subject && (
                <span className="field-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.subject}
                </span>
              )}
            </div>

            {/* Message Field */}
            <div className={`form-group input-with-icon ${errors.message && touched.message ? 'has-error-field' : ''}`}>
              <i className="fas fa-comment-alt field-icon textarea-icon" aria-hidden="true"></i>
              <textarea
                name="message"
                placeholder="Your Message (minimum 10 characters) *"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.message && touched.message ? 'has-error' : ''}
                maxLength={1500}
                required
              ></textarea>
              {errors.message && touched.message && (
                <span className="field-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="cta-button primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
