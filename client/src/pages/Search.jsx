import { useState } from "react";

export default function Search() {
  const [sessionId, setSessionId] = useState("");
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setSession(null);

    try {
      const response = await fetch(`http://localhost:5176/api/sessions/${sessionId}`);
      if (!response.ok) throw new Error("Session not found");
      const data = await response.json();
      setSession(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#E30613] mb-6">Search by Session ID</h2>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter Session ID"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg p-2"
        />
        <button
          type="submit"
          className="bg-[#E30613] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {session && (
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-[#E30613] mb-4">
            {session.name}
          </h3>
          <p><span className="font-semibold">Series:</span> {session.series}</p>
          <p><span className="font-semibold">Track:</span> {session.track}</p>
          <p><span className="font-semibold">State:</span> {session.state}</p>
          <p><span className="font-semibold">Start:</span> 
            {" "}
            {session.startTime ? new Date(session.startTime).toLocaleString() : "TBD"}
          </p>
          <p><span className="font-semibold">Duration:</span> {session.duration}</p>
        </div>
      )}
    </div>
  );
}
