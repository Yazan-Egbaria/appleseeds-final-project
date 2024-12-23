function LoadingDialog({ isLoading, message }) {
  if (!isLoading) return null; // Render nothing if not loading

  return (
    <div className="loading-dialog">
      <div className="spinner"></div> {/* Add a spinner if desired */}
      <p>{message}</p>
    </div>
  );
}

export default LoadingDialog;
