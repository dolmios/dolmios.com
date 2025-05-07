import React, { type JSX } from "react";

export function useWaves(waveColor: string): JSX.Element {
  // Helper to generate SVG background as a data URL
  const getWaveWithColor = (waveType: 'low' | 'medium', color: string, opacity: number = 1) => {
    let wavePath = "";
    if (waveType === 'medium') {
      wavePath = "M0,50 C100,35 200,25 300,35 C400,45 500,30 600,35 C700,40 800,25 900,35 C1000,45 1100,30 1200,35 L1200,50 L0,50 Z";
    } else {
      wavePath = "M0,50 C200,30 400,25 600,30 C800,35 1000,25 1200,30 L1200,50 L0,50 Z";
    }
    return `url("data:image/svg+xml,%3Csvg width='1200' height='50' viewCard='0 0 1200 50' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='${wavePath}' fill='${encodeURIComponent(color)}' opacity='${opacity}'/%3E%3C/svg%3E")`;
  };
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 50, overflow: 'hidden', zIndex: 1 }}>
      <div 
        style={{ 
          position: 'absolute', width: '100%', height: 50, backgroundRepeat: 'repeat-x', backgroundSize: 'cover', transformOrigin: 'center bottom', backgroundImage: getWaveWithColor('medium', waveColor, 0.2), animation: 'ripple1 4s ease-in-out infinite', bottom: 0
        }}
      />
      <div 
        style={{ 
          position: 'absolute', width: '100%', height: 50, backgroundRepeat: 'repeat-x', backgroundSize: 'cover', transformOrigin: 'center bottom', backgroundImage: getWaveWithColor('low', waveColor, 0.15), animation: 'ripple2 5s ease-in-out infinite', animationDelay: '2.5s', bottom: 0
        }}
      />
    </div>
  );
} 