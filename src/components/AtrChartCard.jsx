"use client";
import "./AtrChartCard.css";

export default function AtrChartCard() {
  return (
    <div className="atr-visual-card">
      <div className="atr-visual-card__head">
        <span className="atr-visual-card__label">ATR GRID SIMULATION</span>
        <span className="atr-visual-card__live">
          <span className="atr-visual-card__dot" aria-hidden="true" />
          Live Simulation
        </span>
      </div>

      <div className="atr-visual-card__stage">
        <div className="atr-visual-card__glow" aria-hidden="true" />
        {/* Placeholder graphic — swap /images/atr-grid-3d-chart.png for a
            higher-resolution export whenever one is available. */}
        <img
          className="atr-visual-card__img"
          src="/images/atr-grid-3d-chart.png"
          alt="AURUM GOLD EA ATR grid strategy Gold trading simulation"
        />
      </div>
    </div>
  );
}
