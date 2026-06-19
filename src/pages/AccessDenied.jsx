import "./AccessDenied.css";

function AccessDenied() {
  return (
    <div className="access-denied">
      <div className="access-denied-card">
        <div className="access-denied-icon">🚫</div>

        <h1 className="access-denied-title">
          Access Denied
        </h1>

        <p className="access-denied-text">
          You are not allowed to inspect or access
          restricted resources on this website.
        </p>

        <a href="/" className="access-denied-btn">
          Go To Home
        </a>
      </div>
    </div>
  );
}

export default AccessDenied;