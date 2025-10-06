import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");

    if (!sessionId.trim()) {
      setError("Please enter a session ID.");
      return;
    }

    // Redirect to SessionInformation page with the entered ID
    navigate(`/session/${sessionId}`);
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
    </div>
  );
}
