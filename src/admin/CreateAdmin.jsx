import { useState } from "react";
import { createAdmin } from "../api/adminApi";
import { useNavigate } from "react-router-dom";

function CreateAdmin() {
  const [form, setForm] = useState({ firstName: "", lastName: "", phoneNumber: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAdmin(form);
      navigate("/admin/dashboard");
    } catch (err) {
      setError("Failed to create admin.");
    }
  };

  return (
    <section>
      <h2>Create Admin</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"  
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Admin</button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </form>
    </section>
  );
}

export default CreateAdmin;
