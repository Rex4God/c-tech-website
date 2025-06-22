import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact">
      <h2>Contact Us</h2>

      <form
        className="contact-form"
        action="https://getform.io/f/bpjprvrb"
        method="POST"
      >
        <input type="hidden" name="_gotcha" style={{ display: "none" }} />

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
          type="tel"
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
          rows="5"
          required
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
