
export const fetchSessions = async () => {
  const response = await fetch('http://localhost:5176/api/sessions');
  if (!response.ok) throw new Error('Failed to fetch sessions');
  return await response.json();
};

export const fetchSessionById = async (sessionId) => {
  const response = await fetch(`http://localhost:5176/api/sessions/${sessionId}`);
  if (!response.ok) throw new Error('Failed to fetch session');
  return await response.json();
};
