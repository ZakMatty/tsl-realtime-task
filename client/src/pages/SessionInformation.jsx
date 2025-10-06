import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSessionById } from "../services/sessions";
import { Bars } from "react-loader-spinner";
import "./SessionInformation.css";

export default function SessionInformation() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [delayCountdown, setDelayCountdown] = useState(2);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setDelayCountdown(2);

    // Countdown for 2s delay
    const countdownInterval = setInterval(() => {
      setDelayCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      const fetchAndSet = () => {
        fetchSessionById(sessionId)
          .then((data) => {
            if (!isMounted) return;
            setSession(data);
            setLoading(false);
          })
          .catch(() => {
            if (!isMounted) return;
            setSession(null);
            setLoading(false);
          });
      };

      fetchAndSet();
      const interval = setInterval(fetchAndSet, 30000);
      return () => clearInterval(interval);
    }, 2000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      clearInterval(countdownInterval);
    };
  }, [sessionId]);

  useEffect(() => {
    if (!session?.startTime || !session?.duration) return;

    const updateTime = () => {
      const start = new Date(session.startTime);
      const [hours, minutes, seconds] = session.duration.split(":").map(Number);
      const end = new Date(start.getTime() + hours * 3600000 + minutes * 60000 + seconds * 1000);
      const diff = end - new Date();

      if (diff <= 0) {
        setTimeRemaining("00:00:00");
      } else {
        const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
        const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
        const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
        setTimeRemaining(`${h}:${m}:${s}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [session]);

  if (loading) {
    return (
      <div className="session-loading">
        <Bars
          height="40"
          width="100"
          color="#005fa3"
          ariaLabel="loading-bar"
          visible={true}
        />
        <div>
          Loading session details... <br />
          {delayCountdown > 0
            ? `Please wait ${delayCountdown} second${delayCountdown > 1 ? "s" : ""}...`
            : "Fetching data..."}
        </div>
      </div>
    );
  }
  if (!loading && !session) return <div className="session-not-found">Session not found.</div>;

  return (
    <div className="session-info-container">
      <div className="session-card">
        <h2>{session.name}</h2>
        <div className="session-details">
          <div><strong>Series:</strong> {session.series}</div>
          <div><strong>Track:</strong> {session.track}</div>
          <div><strong>State:</strong> <span className={`session-state ${session.state?.toLowerCase()}`}>{session.state}</span></div>
          <div><strong>Start Time:</strong> {session.startTime ? new Date(session.startTime).toLocaleString() : "TBD"}</div>
          <div><strong>Duration:</strong> {session.duration}</div>
          <div><strong>Time Remaining:</strong> {timeRemaining}</div>
        </div>
      </div>

      <h3 className="competitors-title">Competitors</h3>
      <div className="competitors-grid">
        {session.competitors?.map((comp, idx) => (
          <div className={`competitor-card card-color-${idx % 5}`} key={comp.id}>
            <div className="competitor-header">
              <strong>{comp.name}</strong>
              <span className="competitor-team">{comp.teamName}</span>
            </div>
            <div className="competitor-details">
              <div><strong>Class:</strong> {comp.className || "N/A"}</div>
              <div><strong>Position:</strong> {comp.result?.position ?? "N/A"}</div>
              <div><strong>Finished:</strong> {comp.result?.finished ? "Yes" : "No"}</div>
              <div><strong>Laps:</strong> {comp.result?.laps ?? "N/A"}</div>
              <div><strong>Fastest Lap:</strong> {comp.result?.fastestLapTime?.display || "N/A"}</div>
              <div><strong>Last Lap:</strong> {comp.result?.lastLapTime?.display || "N/A"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
