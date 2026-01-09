# Portfolio TODO

## Contact Form Backend Integration

The contact form in `src/components/ContactFooter.tsx` currently only has frontend implementation.
The form submission is simulated with a timeout.

### Tasks to make the contact form functional:

1. **Set up email service integration**
   - Options:
     - **EmailJS** - Client-side email sending (easiest, no backend needed)
     - **Resend** - Modern email API with React support
     - **SendGrid** - Enterprise email delivery
     - **Nodemailer** with a backend API route

2. **Create API route (if using server-side approach)**
   - Create `/app/api/contact/route.ts`
   - Handle form validation server-side
   - Send email to `yashagrawalrkt123@gmail.com`
   - Return appropriate response

3. **Update ContactFooter.tsx**
   - Replace the simulated `handleSubmit` with actual API call
   - Add proper error handling
   - Show success/error states to user

4. **Add form validation**
   - Email format validation
   - Required fields validation
   - Phone number format (optional)

5. **Add rate limiting**
   - Prevent spam submissions
   - Consider CAPTCHA (reCAPTCHA or hCaptcha)

6. **Add email templates**
   - Create HTML email template for received inquiries
   - Include all form fields in a professional format

### Example EmailJS Implementation (Recommended for simplicity):

```tsx
// Install: npm install @emailjs/browser

import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        from_name: formData.fullName,
        from_email: formData.email,
        company: formData.company,
        phone: formData.phone,
        project_type: formData.projectType,
        budget: formData.budget,
        message: formData.message,
      },
      'YOUR_PUBLIC_KEY'
    );
    setIsSubmitted(true);
  } catch (error) {
    console.error('Failed to send email:', error);
    // Show error state
  } finally {
    setIsSubmitting(false);
  }
};
```

### Environment Variables Needed:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Other Future Enhancements

- [ ] Add loading skeleton for GitHub stats
- [ ] Add dark/light mode toggle
- [ ] Add page transitions between routes
- [ ] Add blog section
- [ ] Add project case studies
- [ ] Add resume/CV download button
- [ ] Add analytics (Vercel Analytics, Google Analytics)
- [ ] Add SEO meta tags for each page
- [ ] Add Open Graph images for social sharing
