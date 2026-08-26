"use client";
import Icon from "./Icon";
import MailLink from "./MailLink";
import { tutorialVideo, profitablePoints, profitableClosing } from "../data/content";
import "./ProfitableExplainer.css";

export default function ProfitableExplainer() {
  return (
    <section id="how-it-works" className="section profitable">
      <div className="container">
        <div className="profitable__head reveal">
          <h2>
            How AURUM makes you a <span className="italic">Rule-Based Trader</span>
          </h2>
        </div>

        <div className="profitable__video reveal" style={{ "--reveal-delay": "80ms" }}>
          <div className="video-card">
            <video
              className="video-card__player"
              src={tutorialVideo.src}
              poster={tutorialVideo.poster}
              controls
              autoPlay
              muted
              loop
              playsInline
            >
              Sorry, your browser doesn&apos;t support embedded videos.
            </video>
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
