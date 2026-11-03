"use server";

import { Resend } from "resend";

const DEFAULT_FROM_EMAIL = "Contact Form <onboarding@resend.dev>";
const DEFAULT_TO_EMAIL = "contact@marcaurelebesner.com";

const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 320;
const MAX_MESSAGE_LENGTH = 5000;

const NOT_CONFIGURED_ERROR =
  "The contact form is temporarily unavailable. Please reach out via social media.";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function sendContactEmail(formData: FormData) {
  const name = getField(formData, "name");
  const email = getField(formData, "email");
  const message = getField(formData, "message");

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, error: "All fields are required" };
  }

  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return { success: false, error: "One or more fields are too long" };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email address" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "Contact form is not configured: RESEND_API_KEY is missing. See .env.example.",
    );
    return { success: false, error: NOT_CONFIGURED_ERROR };
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");
  // Strip line breaks so user input can't break the subject header.
  const subjectName = name.replace(/[\r\n]+/g, " ");

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL || DEFAULT_TO_EMAIL,
      replyTo: email,
      subject: `New contact form submission from ${subjectName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Failed to send email. Please try again." };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
