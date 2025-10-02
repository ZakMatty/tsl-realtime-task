export const fetchSessions = async () => {
  const response = await fetch('http://localhost:5176/api/sessions'); // your backend
  if (!response.ok) throw new Error('Failed to fetch sessions');
  return await response.json();
};
