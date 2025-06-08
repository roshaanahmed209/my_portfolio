# EmailJS Setup Guide

This guide will help you set up EmailJS to receive emails from your portfolio contact form.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Select Gmail and connect your Google account
   - **Outlook**: Select Outlook/Hotmail
   - **Other**: You can also use other email services

### For Gmail Setup:
1. Select "Gmail"  
2. Click "Connect Account"
3. Sign in with your Google account (roshaanahmed290@gmail.com)
4. Allow EmailJS permissions
5. Your service will be created with a **Service ID** (save this!)

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Template Name**: `portfolio_contact`

**Subject**: `New Portfolio Contact: {{from_name}}`

**Content**:
```
Hello Roshaan,

You have received a new message from your portfolio website!

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Save the template and note the **Template ID**

## Step 4: Update Your Code

Replace the placeholders in your `script.js` file:

```javascript
// Replace these values with your actual EmailJS credentials
emailjs.init("YOUR_PUBLIC_KEY");        // Your EmailJS Public Key
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

### Where to find these values:

1. **Public Key**: 
   - Go to "Account" → "General" 
   - Copy your "Public Key"

2. **Service ID**: 
   - Go to "Email Services"
   - Copy the ID of your Gmail service

3. **Template ID**: 
   - Go to "Email Templates"  
   - Copy the ID of your contact template

## Step 5: Update script.js

Open your `script.js` file and replace:

```javascript
// Replace this line:
emailjs.init("YOUR_PUBLIC_KEY");

// With your actual public key:
emailjs.init("your_actual_public_key_here");

// Replace this line:
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)

// With your actual IDs:
emailjs.send('your_service_id', 'your_template_id', templateParams)
```

## Step 6: Test Your Contact Form

1. Open your portfolio website
2. Fill out the contact form
3. Submit the form
4. Check your email (roshaanahmed290@gmail.com) for the message

## Troubleshooting

### Common Issues:

1. **"EmailJS is not defined" error**:
   - Make sure the EmailJS script is loaded before your script.js
   - Check your internet connection

2. **"Failed to send email" error**:
   - Verify your Service ID and Template ID are correct
   - Check your Public Key
   - Ensure your email service is properly connected

3. **Emails not received**:
   - Check your spam folder
   - Verify the email template is set up correctly
   - Make sure the "To Email" field in your template points to the right address

### Testing Template Variables:

In your EmailJS template, you can test with these variables:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email  
- `{{message}}` - The message content
- `{{to_email}}` - Your email (roshaanahmed290@gmail.com)

## Security Notes

- Your EmailJS Public Key is safe to use in client-side code
- EmailJS provides 200 free emails per month
- For more emails, you can upgrade to a paid plan

## Example Final Code

Here's what your final EmailJS configuration should look like:

```javascript
// EmailJS Configuration (example)
(function() {
    emailjs.init("user_abc123xyz789"); // Your actual public key
})();

// In the form submission:
emailjs.send('service_gmail123', 'template_contact456', templateParams)
```

## Support

If you need help:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. EmailJS support: https://www.emailjs.com/support/
3. Test your setup using EmailJS dashboard testing tools

---

**Note**: Remember to replace `YOUR_PUBLIC_KEY`, `YOUR_SERVICE_ID`, and `YOUR_TEMPLATE_ID` with your actual EmailJS credentials! 