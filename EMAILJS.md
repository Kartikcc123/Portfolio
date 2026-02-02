EmailJS integration

1) Install the client:
   npm install @emailjs/browser

   On Windows PowerShell you may need to run this in a regular Command Prompt (cmd) or adjust execution policy. If PowerShell blocks scripts, open a cmd terminal and run the same command.

2) Create an EmailJS account (https://www.emailjs.com), set up an email service (Gmail/Outlook/Smtp), and create a template. Use template variables like `from_name`, `reply_to`, and `message`.

3) Add the credentials to `.env.local` in the project root:

   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key

4) Restart the dev server (Vite) so `import.meta.env` picks up the new variables.

5) The contact form in `src/App.jsx` now uses EmailJS to send messages directly (no external mail app). If you want to customize the template parameters, edit the `templateParams` object in `src/App.jsx` to match your EmailJS template.
