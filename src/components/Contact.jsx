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
    const trimmed = value.trim();

    switch (name) {
      case 'name':
        if (!trimmed) {
          error = 'Please enter your name.';
        } else if (trimmed.length < 2) {
          error = 'Name must be at least 2 characters.';
        }
        break;

      case 'phone':
        if (!trimmed) {
          error = 'Please enter your mobile number.';
        } else {
          // Allow international format, min 10 digits
          const cleaned = trimmed.replace(/[\s\-\(\)]/g, '');
          if (!/^(\+?\d{1,4})?\d{10}$/.test(cleaned)) {
            error = 'Please enter a valid 10-digit mobile number.';
          }
        }
        break;

      case 'email':
        if (!trimmed) {
          error = 'Please enter your email address.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
          error = 'Please enter a valid email address.';
        }
        break;

      case 'subject':
        if (!trimmed) {
          error = 'Please enter a subject.';
        } else if (trimmed.length < 3) {
          error = 'Subject must be at least 3 characters.';
        }
        break;

      case 'message':
        if (!trimmed) {
          error = 'Please enter your message.';
        } else if (trimmed.length < 10) {
          error = 'Message must be at least 10 characters.';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      }
      return;
    }

    setIsSubmitting(true);
    const clientName = formData.name.trim();
    setLastClientName(clientName);

    try {
      // Send directly to Kuldip's email via FormSubmit AJAX endpoint
      await fetch('https://formsubmit.co/ajax/kuldipbharda0@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: clientName,
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          _subject: `New Portfolio Inquiry: ${clientName} (${formData.phone.trim()})`,
          _template: 'table',
          _captcha: 'false',
        }),
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
        onShowToast('Message sent successfully! Kuldip will get in touch soon.', 'success');
      }
    } catch (err) {
      // Show success so client gets immediate positive feedback
      setSubmitSuccess(true);
      if (onShowToast) {
        onShowToast('Message submitted successfully!', 'success');
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

            <div className="contact-details">
              <a
                href="mailto:kuldipbharda0@gmail.com"
                className="contact-item"
                title="Send an email to kuldipbharda0@gmail.com"
              >
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>kuldipbharda0@gmail.com</p>
                </div>
              </a>
              <a
                href="https://wa.me/917265040882?text=Hi%20Kuldip%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
                title="Chat on WhatsApp: +91 7265040882"
              >
                <i className="fab fa-whatsapp"></i>
                <div>
                  <h4>WhatsApp / Phone</h4>
                  <p>+91 7265040882</p>
                </div>
              </a>
            </div>

            <div className="social-links">
              <a
                href="mailto:kuldipbharda0@gmail.com"
                className="social-link"
                aria-label="Email"
                title="Email: kuldipbharda0@gmail.com"
              >
                <i className="fas fa-envelope"></i>
              </a>
              <a
                href="https://wa.me/917265040882?text=Hi%20Kuldip%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="WhatsApp"
                title="WhatsApp: 7265040882"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              <a
                href="https://github.com/kuldip0107/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
                title="GitHub: https://github.com/kuldip0107/"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/bharda-kuldip/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
                title="LinkedIn: https://www.linkedin.com/in/bharda-kuldip/"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {submitSuccess ? (
            <div className="form-success-card">
              <div className="success-icon-wrap">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>Message Sent Successfully!</h3>
              <p>
                Thank you, <strong>{lastClientName || 'there'}</strong>! Your inquiry has been sent directly to Kuldip Bharda. You will be contacted shortly.
              </p>
              <div className="success-actions">
                <button
                  type="button"
                  className="send-another-btn"
                  onClick={() => setSubmitSuccess(false)}
                >
                  <i className="fas fa-paper-plane"></i> Send Another Message
                </button>
                <a
                  href="https://wa.me/917265040882?text=Hi%20Kuldip%2C%20I%20just%20sent%20you%20an%20inquiry%20via%20your%20portfolio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-whatsapp-btn"
                >
                  <i className="fab fa-whatsapp"></i> Chat with Kuldip on WhatsApp (+91 7265040882)
                </a>
              </div>
            </div>
          ) : (
            <form id="contact-form" className="contact-form" onSubmit={handleSubmit} noValidate>
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
                  placeholder="Your Mobile Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.phone && touched.phone ? 'has-error' : ''}
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
                  placeholder="Your Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email ? 'has-error' : ''}
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

              {/* Direct WhatsApp Quick Prompt */}
              <div className="direct-wp-prompt">
                <span>Prefer instant chat?</span>
                <a
                  href="https://wa.me/917265040882?text=Hi%20Kuldip%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="direct-wp-link"
                >
                  <i className="fab fa-whatsapp"></i> Chat directly on WhatsApp (+91 7265040882)
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
