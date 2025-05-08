import '../styles/loadingSpinner.style.scss';

export default function Spinner() {
  return (
    <div id="global_loading">
      <div className="spinner"></div>
      <p>Loaing...</p>
    </div>
  );
}