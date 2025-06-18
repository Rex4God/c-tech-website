import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await fetch("https://formsubmit.co/ajax/ctechacademies@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        FirstName: form.firstName,
        LastName: form.lastName,
        PhoneNumber: form.phoneNumber,
        email: form.email,
        message: form.message,
        _captcha: "false",
      }),
    });
    setSent(true);
    setForm({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      message: "",
    });
  };

  return (
    <section id="contact">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Your First Name"
          required
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Your Last Name"
          required
          value={form.lastName}
          onChange={handleChange}
        />
        <input
          type="phone"
          name="phoneNumber"
          placeholder="Your Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">Send Message</button>
        {sent && <div style={{ color: "#0072ff", marginTop: 10 }}>Message sent successfully!</div>}
      </form>
    </section>
  );
}

export default Contact;