export async function sendEmail({ name, email, message }) {
  console.log(`Sending email mock to developer mail box:`, { name, email, message });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Email sent successfully!' });
    }, 500);
  });
}
