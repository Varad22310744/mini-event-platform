import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    capacity: ""
  });

  const [image, setImage] = useState(null);

const submit = async () => {
  try {
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    data.append("location", form.location);
    data.append("capacity", form.capacity);

    if (image) {
      data.append("image", image);
    }

    for (let pair of data.entries()) {
      console.log(pair[0], pair[1]); // DEBUG
    }

    await axios.post("http://localhost:5000/events", data, {
      headers: {
        Authorization: token
      }
    });

    alert("Event created");
    nav("/events");
  } catch (err) {
    alert("Create failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Create Event</h2>

        <input
          className="input"
          placeholder="Event Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="input"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
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

        {/* 📷 Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="mb-3"
          onChange={e => setImage(e.target.files[0])}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={submit}
        >
          Create Event
        </button>
      </div>
    </div>
  );
}
