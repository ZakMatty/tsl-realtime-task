import { useEffect, useState } from "react";
import { fetchSessions } from "../services/sessions";
import "./Home.css";

export default function Home() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions()
      .then((data) => setSessions(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">All Sessions</h2>
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
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.sessionId}>
                  <td>{session.name}</td>
                  <td>{session.series}</td>
                  <td>{session.track}</td>
                  <td>{session.state}</td>
                  <td>
                    {session.startTime
                      ? new Date(session.startTime).toLocaleString()
                      : "TBD"}
                  </td>
                  <td>{session.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
