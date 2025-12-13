import react from 'react';

export default function BGAnimation() {

  return (
    <div className="absolute inset-0 -z-1 overflow-hidden">
      <svg className="absolute w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="50%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <path fill="url(#waveGradient)" fillOpacity="1">
          <animate
            attributeName="d"
            dur="12s"
            repeatCount="indefinite"
            values="M0,160 C480,100 960,220 1440,160 L1440,320 L0,320 Z;M0,180 C480,220 960,100 1440,180 L1440,320 L0,320 Z;M0,160 C480,100 960,220 1440,160 L1440,320 L0,320 Z"
            keyTimes="0; 0.5; 1"
            calcMode="spline"
            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
          />
        </path>
      </svg>
    </div>
  )
}