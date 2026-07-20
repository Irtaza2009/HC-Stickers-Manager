function LoadingScreen({ label = "Getting your sticker book ready" }) {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-mark" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>{label}</p>
    </div>
  );
}

export default LoadingScreen;
