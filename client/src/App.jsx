import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SessionInformation from "./pages/SessionInformation";
import "./Header.css";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Ribbon Header */}
      <header className="ribbon-header">
        <div className="ribbon-content">
          <h1 className="ribbon-title">Tech Test</h1>
          <nav className="ribbon-nav">
            <Link to="/" className="ribbon-link">Home</Link>
            <Link to="/search" className="ribbon-link">Search by Session ID</Link>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/session/:sessionId" element={<SessionInformation />} />
        </Routes>
      </main>
    </div>
  );
}
