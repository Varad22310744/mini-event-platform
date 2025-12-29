import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const nav = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // 🔒 Protect page + load events
  useEffect(() => {
    if (!token) {
      nav("/");
    } else {
      fetchEvents();
    }
  }, []);

  // 📥 Fetch all events
  const fetchEvents = async () => {
    const res = await axios.get("http://localhost:5000/events");
    setEvents(res.data);
  };

  // 🎟️ RSVP
  const rsvp = async (eventId, capacity) => {
    try {
      await axios.post(
        "http://localhost:5000/rsvp/join",
        { eventId, capacity },
        { headers: { Authorization: token } }
      );
      alert("RSVP successful");
      fetchEvents();
    } catch (err) {
      alert(err.response?.data || "Event Full");
    }
  };

  // 🗑️ Delete event (only creator)
  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:5000/events/${id}`, {
        headers: { Authorization: token }
      });
      alert("Event deleted");
      fetchEvents();
    } catch (err) {
      alert("You are not allowed to delete this event");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Events</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => nav("/create")}
        >
          Create Event
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((e) => (
          <div
            key={e._id}
            className="bg-white rounded shadow overflow-hidden"
          >
            {/* 🖼️ Event Image */}
            {e.imageUrl && (
  <div className="w-full h-44 bg-gray-200 overflow-hidden">
    <img
      src={e.imageUrl}
      alt="event"
      className="w-full h-full object-cover"
    />
  </div>
)}


            {/* Event Details */}
            <div className="p-4">
            <h3 className="text-lg font-bold">{e.title}</h3>

{e.description && (
  <p className="text-sm text-gray-700 mt-1">
    {e.description}
  </p>
)}

<p className="text-sm text-gray-600 mt-1">
  📍 {e.location}
</p>

<p className="text-sm mt-1">
  {e.attendeesCount} / {e.capacity} attending
</p>


              {/* RSVP Button */}
              <button
                className={`mt-3 w-full py-2 rounded text-white ${
                  e.attendeesCount >= e.capacity
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600"
                }`}
                disabled={e.attendeesCount >= e.capacity}
                onClick={() => rsvp(e._id, e.capacity)}
              >
                {e.attendeesCount >= e.capacity ? "Event Full" : "RSVP"}
              </button>

              {/* Edit & Delete (only creator) */}
              {e.createdBy === userId && (
                <div className="flex gap-2 mt-3">
                  <button
                    className="w-1/2 bg-yellow-500 text-white py-1 rounded"
                    onClick={() => nav(`/edit/${e._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="w-1/2 bg-red-600 text-white py-1 rounded"
                    onClick={() => deleteEvent(e._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
