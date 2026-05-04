function AuthPage({
  authForm,
  authMode,
  loading,
  message,
  onAuthModeChange,
  onAuthSubmit,
  onAuthUpdate,
}) {
  return (
    <main className="auth-page">
      <section className="auth-media">
        <div className="auth-brand">
          <span className="brand-mark">TT</span>
          <span className="brand-name">Travel Tourism</span>
        </div>
        <div className="auth-copy">
          <p className="eyebrow">Your world begins here</p>
          <h1>Find the trip that feels impossible to forget.</h1>
          <p>Login or create an account to unlock destinations, AI trip planning, bookings, reviews, and travel management.</p>
        </div>
      </section>

      <section className="auth-card">
        <div>
          <p className="eyebrow">Account</p>
          <h2>{authMode === "register" ? "Create your account" : "Welcome back"}</h2>
        </div>

        <div className="segmented">
          <button className={authMode === "login" ? "selected" : ""} onClick={() => onAuthModeChange("login")} type="button">Login</button>
          <button className={authMode === "register" ? "selected" : ""} onClick={() => onAuthModeChange("register")} type="button">Register</button>
        </div>

        {message && <p className="inline-notice">{message}</p>}

        <form onSubmit={onAuthSubmit}>
          {authMode === "register" && (
            <label>Name<input name="name" value={authForm.name} onChange={onAuthUpdate} required /></label>
          )}
          <label>Email<input name="email" type="email" value={authForm.email} onChange={onAuthUpdate} required /></label>
          <label>Password<input name="password" type="password" value={authForm.password} onChange={onAuthUpdate} required /></label>
          <button disabled={loading}>{loading ? "Please wait..." : authMode === "register" ? "Create Account" : "Login"}</button>
        </form>
      </section>
    </main>
  );
}

export default AuthPage;
