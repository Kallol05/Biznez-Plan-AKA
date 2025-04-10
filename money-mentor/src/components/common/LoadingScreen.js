import "./LoadingScreen.css"

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default LoadingScreen

