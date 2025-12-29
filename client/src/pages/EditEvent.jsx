import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEvent() {
  const { id } = useParams();
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    location: "",
    capacity: ""
  });

  // 🔒 Protect route + load event
  useEffect(() => {
    if (!token) {
      nav("/");
    } else {
      loadEvent();
    }
  }, []);

  const loadEvent = async () => {
    const res = await axios.get("http://localhost:5000/events");
    const event = res.data.find(e => e._id === id);

    if (!event) {
      alert("Event not found");
      nav("/events");
      return;
    }

    setForm({
      title: event.title,
      location: event.location,
      capacity: event.capacity
    });
  };

  const updateEvent = async () => {
    try {
      await axios.put(
        `http://localhost:5000/events/${id}`,
        form,
        { headers: { Authorization: token } }
      );
      alert("Event updated");
      nav("/events");
    } catch (err) {
      alert("Not allowed or error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>

        <input
          className="input"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="input"
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />

        <input
          type="number"
          className="input"
          placeholder="Capacity"
          value={form.capacity}
          onChange={e => setForm({ ...form, capacity: e.target.value })}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={updateEvent}
        >
          Update Event
        </button>
      </div>
    </div>
  );
}
