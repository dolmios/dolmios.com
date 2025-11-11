import React, { type JSX } from "react";

export function useWaves(waveColor: string): JSX.Element {
  // Helper to generate SVG background as a data URL
  const getWaveWithColor = (waveType: 'low' | 'medium', color: string, opacity = 1): string => {
    let wavePath = "";

    if (waveType === 'medium') {
      // Smooth sine wave - proper wave structure
      wavePath = "M0,70 Q150,30 300,70 T600,70 T900,70 T1200,70 L1200,100 L0,100 Z";
    } else {
      // Gentler sine wave with smaller amplitude
      wavePath = "M0,60 Q200,40 400,60 T800,60 T1200,60 L1200,100 L0,100 Z";
    }

    return `url("data:image/svg+xml,%3Csvg width='1200' height='100' viewBox='0 0 1200 100' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='${wavePath}' fill='${encodeURIComponent(color)}' opacity='${opacity}'/%3E%3C/svg%3E")`;
  };

  return (
    <div style={{ bottom: 0, left: 0, overflow: 'hidden', position: 'absolute', right: 0, top: 0, zIndex: 1 }}>
      <style>
        {`
          @keyframes waveMove1 {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100px); }
          }
          @keyframes waveMove2 {
            0% { transform: translateX(0); }
            100% { transform: translateX(100px); }
          }
        `}
      </style>
      <div
        style={{
          animation: 'waveMove1 8s linear infinite',
          backgroundImage: getWaveWithColor('medium', waveColor, 0.25),
          backgroundRepeat: 'repeat-x',
          backgroundSize: '1200px 100%',
          bottom: 0,
          height: '100%',
          position: 'absolute',
          transformOrigin: 'center bottom',
          width: '120%'
        }}
      />
      <div
        style={{
          animation: 'waveMove2 12s linear infinite reverse',
          backgroundImage: getWaveWithColor('low', waveColor, 0.15),
          backgroundRepeat: 'repeat-x',
          backgroundSize: '1200px 100%',
          bottom: 0,
          height: '100%',
          position: 'absolute',
          transformOrigin: 'center bottom',
          width: '120%'
        }}
      />
    </div>
  );
}
