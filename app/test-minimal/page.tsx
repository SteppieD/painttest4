export default function TestMinimalPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Minimal Test Page</h1>
      <p>This page has no external dependencies.</p>
      <p>If you can see this, basic Next.js routing works.</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}