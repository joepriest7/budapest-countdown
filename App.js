import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

/* ── Hungarian flag SVG component ── */
const HungarianFlag = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 1200 800"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="1200" height="267" y="0" fill="#CE2939" />
    <rect width="1200" height="267" y="267" fill="#FFFFFF" />
    <rect width="1200" height="266" y="534" fill="#477050" />
  </svg>
);

/* ── Countdown digit box ── */
const CountdownUnit = ({ value, label }) => (
  <div className="countdown-unit">
    <div className="countdown-value-wrapper">
      <span className="countdown-value" key={value}>
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="countdown-label">{label}</span>
  </div>
);

/* ── Particle background ── */
const Particles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 8 + Math.random() * 12,
        size: 2 + Math.random() * 4,
        color:
          i % 3 === 0
            ? 'rgba(206,41,57,0.6)'
            : i % 3 === 1
            ? 'rgba(255,255,255,0.4)'
            : 'rgba(71,112,80,0.6)',
      })),
    []
  );

  return (
    <div className="particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
};

/* ── Main App ── */
function App() {
  const departureDate = new Date('2026-05-14T04:45:00Z'); // 5:45 AM BST = 4:45 UTC

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [loaded, setLoaded] = useState(false);

  function getTimeLeft() {
    const now = new Date();
    const diff = departureDate - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, departed: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      departed: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    setTimeout(() => setLoaded(true), 100);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`app ${loaded ? 'loaded' : ''}`}>
      <Particles />

      {/* Decorative flags */}
      <HungarianFlag className="flag flag-top-left" />
      <HungarianFlag className="flag flag-top-right" />

      <div className="content">
        {/* Header flags row */}
        <div className="flag-row fade-in" style={{ animationDelay: '0.2s' }}>
          <HungarianFlag className="flag-inline" />
          <HungarianFlag className="flag-inline" />
          <HungarianFlag className="flag-inline" />
        </div>

        {/* Destination */}
        <h2 className="subtitle fade-in" style={{ animationDelay: '0.4s' }}>
          BUDAPEST
        </h2>

        <h1 className="title fade-in" style={{ animationDelay: '0.6s' }}>
          STAG DO
        </h1>

        <div className="date-badge fade-in" style={{ animationDelay: '0.8s' }}>
          <span>14</span>
          <span className="date-sep">—</span>
          <span>17 MAY 2026</span>
        </div>

        {/* Tagline */}
        <p className="tagline fade-in" style={{ animationDelay: '1s' }}>
          the moment you have been waiting for
        </p>

        {/* Countdown */}
        <div className="countdown fade-in" style={{ animationDelay: '1.2s' }}>
          {timeLeft.departed ? (
            <div className="departed-msg">
              <span>🇭🇺</span> WE'RE OFF! <span>🇭🇺</span>
            </div>
          ) : (
            <>
              <CountdownUnit value={timeLeft.days} label="DAYS" />
              <div className="countdown-colon">:</div>
              <CountdownUnit value={timeLeft.hours} label="HRS" />
              <div className="countdown-colon">:</div>
              <CountdownUnit value={timeLeft.minutes} label="MIN" />
              <div className="countdown-colon">:</div>
              <CountdownUnit value={timeLeft.seconds} label="SEC" />
            </>
          )}
        </div>

        {/* Departure info */}
        <div className="departure fade-in" style={{ animationDelay: '1.4s' }}>
          <div className="departure-icon">✈</div>
          <span>Departing 5:45 AM</span>
        </div>

        {/* Bottom flags */}
        <div className="flag-row fade-in" style={{ animationDelay: '1.5s' }}>
          <HungarianFlag className="flag-inline" />
          <HungarianFlag className="flag-inline" />
          <HungarianFlag className="flag-inline" />
        </div>

        {/* Footer tagline */}
        <div className="footer-strip fade-in" style={{ animationDelay: '1.6s' }}>
          <div className="footer-line"></div>
          <p className="footer-text">
            <span>Ruin Bars</span>
            <span className="footer-dot">◆</span>
            <span>Boat Parties</span>
            <span className="footer-dot">◆</span>
            <span>Clubs</span>
            <span className="footer-dot">◆</span>
            <span className="no-excuses">No Excuses</span>
          </p>
          <div className="footer-line"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
