import { useEffect, useState } from "react";
import { fetchSessions } from "../services/sessions";
import { startConnection, stopConnection } from "../services/sessionsHub";
import { FiCopy, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterState, setFilterState] = useState("All States");
  const [filterTrack, setFilterTrack] = useState("All Tracks");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    // Start SignalR for live updates
    startConnection((data) => {
      console.log("🔥 Received update from SignalR:", data);
      setSessions(data);
      setLoading(false);
    });

    return () => stopConnection();
  }, []);

  // Define your state and track options
  const stateOptions = [
    "All States",
    "Pending",
    "Active",
    "Running",
    "Finished",
    "Completed"
  ];

  const trackOptions = [
    "All Tracks",
    ...Array.from(new Set(sessions.map(s => s.track).filter(Boolean)))
  ];

  // Filters
  const tracks = ["All", ...new Set(sessions.map(s => s.track).filter(Boolean))];
  const states = ["All", ...new Set(sessions.map(s => s.state).filter(Boolean))];

  // Update your filter logic:
  const filteredSessions = sessions.filter(s =>
    (filterState === "All States" || s.state === filterState) &&
    (filterTrack === "All Tracks" || s.track === filterTrack)
  );

  return (
    <div className="home-container">
      <h2 className="home-title">All Sessions (Live)</h2>

      <div className="controls">
        <select
          value={filterState}
          onChange={e => setFilterState(e.target.value)}
          className="filter-dropdown"
        >
          {stateOptions.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select
          value={filterTrack}
          onChange={e => setFilterTrack(e.target.value)}
          className="filter-dropdown"
        >
          {trackOptions.map(track => (
            <option key={track} value={track}>{track}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div>Loading sessions...</div>
      ) : (
        <div className="table-wrapper">
          <table className="sessions-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Series</th>
                <th>Track</th>
                <th>State</th>
                <th>Start Time</th>
                <th>Duration</th>
                <th>Find Out More</th>
                <th>Copy Session ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredSessions.map(session => (
                <tr key={session.sessionId}>
                  <td>{session.name}</td>
                  <td>{session.series}</td>
                  <td>{session.track}</td>
                  <td>{session.state}</td>
                  <td>{session.startTime ? new Date(session.startTime).toLocaleString() : "TBD"}</td>
                  <td>{session.duration}</td>
                  <td>
                    <button
                      className="find-out-more-btn"
                      title="Find Out More"
                      onClick={() => {
                        stopConnection(); // Stop SignalR before navigating
                        navigate(`/session/${session.sessionId}`);
                      }}
                    >
                      🔗
                    </button>
                  </td>
                  <td>
                    <button onClick={() => navigator.clipboard.writeText(session.sessionId)} className="copy-btn" title="Copy Session ID">
                      <FiCopy />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSessions.length === 0 && <div className="no-results">No sessions match your filters.</div>}
        </div>
      )}

      <div className="refresh-info">
        <FiInfo style={{ marginRight: "8px", verticalAlign: "middle" }} />
        Data is live — updates appear automatically.
      </div>
    </div>
  );
}
