"use client";
import { useRef, useState, useEffect } from "react";
import Icon from "./Icon";
import MailLink from "./MailLink";
import { tutorialVideo, profitablePoints, profitableClosing } from "../data/content";
import "./ProfitableExplainer.css";

export default function ProfitableExplainer() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  function handleUnmute() {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(e => console.log("Play prevented:", e));
    }
    setIsMuted(false);
  }

  return (
    <section id="how-it-works" className="section profitable">
      <div className="container">
        <div className="profitable__head reveal">
          <h2>
            How AURUM makes you a <span className="italic">Rule-Based Trader</span>
          </h2>
        </div>

        <div className="profitable__video reveal" style={{ "--reveal-delay": "80ms" }}>
          <div className="video-card" style={{ position: 'relative' }}>
            <video
              ref={videoRef}
              className="video-card__player"
              src={tutorialVideo.src}
              poster={tutorialVideo.poster}
              controls={!isMuted}
              autoPlay
              muted
              loop
              playsInline
            >
              Sorry, your browser doesn&apos;t support embedded videos.
            </video>
            
            {isMuted && (
              <button 
                onClick={handleUnmute}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  zIndex: 10,
                  background: 'rgba(0,0,0,0.75)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.2)',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.9)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.75)'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
                Tap to Unmute
              </button>
            )}
          </div>
        </div>

        <ul className="profitable__points reveal" style={{ "--reveal-delay": "160ms" }}>
          {profitablePoints.map((point, i) => (
            <li key={point.title}>
              <span className="profitable__num">{String(i + 1).padStart(2, "0")}</span>
              <div className="profitable__point-body">
                <strong className="profitable__point-title">{point.title}</strong>
                <p className="profitable__point-text">{point.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="profitable__close reveal" style={{ "--reveal-delay": "220ms" }}>
          <p className="profitable__close-lead">{profitableClosing.lead}</p>
          <p className="profitable__close-body">{profitableClosing.body}</p>
          <p className="profitable__close-cta">{profitableClosing.cta}</p>
          <div className="profitable__ctas">
            <a href="/schedule" className="btn btn--ghost profitable__cta">
              <Icon name="link" size={16} strokeWidth={2} />
              Schedule Demo
            </a>
            <a href="#pricing" className="btn btn--gold profitable__cta">
              Start Automating
              <Icon name="trend" size={16} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
