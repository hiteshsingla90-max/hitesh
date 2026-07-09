import { useEffect, useState } from 'react';

type HealthStatus = 'checking' | 'ok' | 'error';

function App() {
  const [status, setStatus] = useState<HealthStatus>('checking');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => (res.ok ? setStatus('ok') : setStatus('error')))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <main>
      <h1>Hitesh</h1>
      <p>API status: {status}</p>
    </main>
  );
}

export default App;
