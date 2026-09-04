"use client";
import { founderProfile, founderAchievements, founderOverlayStats } from "../data/content";
import Icon from "./Icon";
import "./FounderSection.css";

export default function FounderSection() {
  return (
    <section id="about" className="section founder">
      <div className="container">
        <div className="founder__card reveal">
          <div className="founder__copy">
            <h2 className="founder__name">{founderProfile.name}</h2>
            <p className="founder__role">{founderProfile.role}</p>

            <p className="founder__bio">
              {founderProfile.bio.map((part, i) =>
                part.type === "strong" ? (
                  <strong key={i}>{part.value}</strong>
                ) : (
                  <span key={i}>{part.value}</span>
                )
              )}
            </p>

            <div className="founder__divider" aria-hidden="true" />

            <h3 className="founder__achievements-title">Key Achievements</h3>
            <ul className="founder__achievements">
              {founderAchievements.map((item) => (
                <li key={item}>
                  <span className="founder__check" aria-hidden="true">
                    <Icon name="check" size={14} strokeWidth={2.4} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="founder__visual">
            <div className="founder__photo">
              <img
                src={founderProfile.image}
                alt="Nikkhil Malhotra Co-Founder AURUM GOLD EA Moneytize Trading Academy Dubai"
              />
            </div>
            <div className="founder__stats">
              {founderOverlayStats.map((stat) => (
                <div className="founder__stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
