'use client'

import { useEffect, useRef, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const BLUE = '#0003A3'
const BLUE_FILL = 'rgba(0,3,163,0.08)'
const BLUE_FILL_SOFT = 'rgba(0,3,163,0.04)'
const GOLD = '#B08A4A'
const GOLD_FILL = 'rgba(176,138,74,0.18)'
const WARM = '#F4EFE3'

/** Manifest of which programs have a Lottie file installed under /public/lottie/.
 *  Initially empty (all use SVG scenes); user drops .lottie files in and the
 *  player auto-engages. We HEAD-check on mount before swapping. */
const LOTTIE_FILES: Record<string, string> = {
  early: '/lottie/early.lottie',
  inclusion: '/lottie/inclusion.lottie',
  speech: '/lottie/speech.lottie',
  motor: '/lottie/motor.lottie',
  behavior: '/lottie/behavior.lottie',
  sensory: '/lottie/sensory.lottie',
  ot: '/lottie/ot.lottie',
  tuina: '/lottie/tuina.lottie',
}

// ─────────────────────────────────────────────────────────────
// SVG SCENE ILLUSTRATIONS — concrete, multi-element compositions
// All viewBox 0 0 280 240 (landscape, generous breathing space)
// ─────────────────────────────────────────────────────────────

function SceneEarly() {
  // Cradle + hanging mobile + swaddled baby + ambient glow
  return (
    <svg viewBox="0 0 280 240" className="scene scene-early" aria-hidden="true">
      {/* Ambient back glows */}
      <circle cx="60" cy="60" r="40" fill={BLUE_FILL_SOFT} className="amb amb-1" />
      <circle cx="230" cy="80" r="50" fill={GOLD_FILL} className="amb amb-2" />

      {/* Hanging mobile bar */}
      <line x1="80" y1="28" x2="200" y2="28" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" className="mobile-bar" />
      <circle cx="80" cy="28" r="3" fill={BLUE} className="mobile-pin" />
      <circle cx="200" cy="28" r="3" fill={BLUE} className="mobile-pin" />

      {/* Three hanging toys */}
      <g className="mobile-toy mobile-toy-1">
        <line x1="100" y1="28" x2="100" y2="78" stroke={BLUE} strokeWidth="1" strokeLinecap="round" />
        {/* star */}
        <path
          d="M 100 80 L 103 89 L 113 89 L 105 95 L 108 105 L 100 99 L 92 105 L 95 95 L 87 89 L 97 89 Z"
          fill={GOLD}
          stroke={BLUE}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </g>
      <g className="mobile-toy mobile-toy-2">
        <line x1="140" y1="28" x2="140" y2="90" stroke={BLUE} strokeWidth="1" strokeLinecap="round" />
        {/* moon */}
        <path
          d="M 130 102 A 12 12 0 1 0 130 78 A 9 9 0 1 1 130 102 Z"
          fill={WARM}
          stroke={BLUE}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>
      <g className="mobile-toy mobile-toy-3">
        <line x1="180" y1="28" x2="180" y2="74" stroke={BLUE} strokeWidth="1" strokeLinecap="round" />
        {/* heart */}
        <path
          d="M 180 96 C 170 86, 162 80, 168 72 C 174 64, 180 72, 180 76 C 180 72, 186 64, 192 72 C 198 80, 190 86, 180 96 Z"
          fill={GOLD_FILL}
          stroke={GOLD}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </g>

      {/* Cradle */}
      <g className="cradle">
        {/* legs */}
        <line x1="80" y1="186" x2="68" y2="220" stroke={BLUE} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="200" y1="186" x2="212" y2="220" stroke={BLUE} strokeWidth="1.4" strokeLinecap="round" />
        {/* rocker base */}
        <path d="M 56 222 Q 140 240 224 222" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
        {/* cradle bowl */}
        <path
          d="M 60 168 L 220 168 L 210 200 Q 140 218 70 200 Z"
          fill="#ffffff"
          stroke={BLUE}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* inner rim shadow */}
        <line x1="68" y1="174" x2="212" y2="174" stroke={BLUE} strokeWidth="0.6" opacity="0.4" />
      </g>

      {/* Swaddled baby inside */}
      <g className="baby">
        {/* swaddle blanket */}
        <path
          d="M 116 188 Q 116 168 140 168 Q 164 168 164 188 L 164 196 Q 140 204 116 196 Z"
          fill={WARM}
          stroke={BLUE}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* face */}
        <circle cx="140" cy="172" r="9" fill="#ffffff" stroke={BLUE} strokeWidth="1.3" />
        <circle cx="137" cy="171" r="0.9" fill={BLUE} />
        <circle cx="143" cy="171" r="0.9" fill={BLUE} />
        <path d="M 137 175 Q 140 177 143 175" fill="none" stroke={BLUE} strokeWidth="0.9" strokeLinecap="round" />
      </g>

      {/* Sleep zzz */}
      <g className="zzz">
        <text x="186" y="158" fontSize="10" fill={GOLD} fontFamily="serif" fontStyle="italic">z</text>
        <text x="194" y="148" fontSize="11" fill={GOLD} fontFamily="serif" fontStyle="italic">z</text>
        <text x="203" y="136" fontSize="13" fill={GOLD} fontFamily="serif" fontStyle="italic">z</text>
      </g>
    </svg>
  )
}

function SceneInclusion() {
  // Teacher + 4 children seated in semicircle, with picture-card center
  return (
    <svg viewBox="0 0 280 240" className="scene scene-inclusion" aria-hidden="true">
      {/* Floor mat (rounded rect) */}
      <ellipse cx="140" cy="200" rx="120" ry="22" fill={BLUE_FILL_SOFT} />
      <ellipse cx="140" cy="198" rx="110" ry="18" fill="none" stroke={BLUE} strokeWidth="1" strokeDasharray="2 3" opacity="0.5" />

      {/* Teacher (top center, larger) */}
      <g className="figure figure-teacher">
        <circle cx="140" cy="52" r="14" fill={WARM} stroke={BLUE} strokeWidth="1.5" />
        {/* eyes */}
        <circle cx="136" cy="51" r="1.1" fill={BLUE} />
        <circle cx="144" cy="51" r="1.1" fill={BLUE} />
        {/* smile */}
        <path d="M 134 56 Q 140 60 146 56" fill="none" stroke={BLUE} strokeWidth="1" strokeLinecap="round" />
        {/* body */}
        <path d="M 122 90 Q 122 70 140 68 Q 158 70 158 90 L 158 110 L 122 110 Z" fill={BLUE_FILL} stroke={BLUE} strokeWidth="1.4" strokeLinejoin="round" />
        {/* gold collar accent */}
        <circle cx="140" cy="74" r="2.5" fill={GOLD} />
      </g>

      {/* Center picture card */}
      <g className="card">
        <rect x="120" y="120" width="40" height="48" fill="#ffffff" stroke={BLUE} strokeWidth="1.5" rx="2" />
        {/* simple sun on card */}
        <circle cx="140" cy="138" r="6" fill={GOLD_FILL} stroke={GOLD} strokeWidth="1.2" />
        <line x1="140" y1="128" x2="140" y2="132" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="140" y1="144" x2="140" y2="148" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="130" y1="138" x2="134" y2="138" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
        <line x1="146" y1="138" x2="150" y2="138" stroke={GOLD} strokeWidth="1.2" strokeLinecap="round" />
        {/* small caption line */}
        <line x1="126" y1="158" x2="154" y2="158" stroke={BLUE} strokeWidth="0.9" strokeLinecap="round" opacity="0.6" />
        <line x1="130" y1="162" x2="150" y2="162" stroke={BLUE} strokeWidth="0.9" strokeLinecap="round" opacity="0.4" />
      </g>

      {/* 4 children seated around */}
      <g className="figure figure-child child-1" style={{ ['--ci' as string]: 0 }}>
        <circle cx="56" cy="146" r="10" fill="#ffffff" stroke={BLUE} strokeWidth="1.4" />
        <path d="M 42 192 Q 42 168 56 166 Q 70 168 70 192 Z" fill={BLUE_FILL} stroke={BLUE} strokeWidth="1.3" strokeLinejoin="round" />
      </g>
      <g className="figure figure-child child-2" style={{ ['--ci' as string]: 1 }}>
        <circle cx="98" cy="172" r="10" fill="#ffffff" stroke={BLUE} strokeWidth="1.4" />
        <path d="M 84 200 Q 84 184 98 182 Q 112 184 112 200 Z" fill={WARM} stroke={BLUE} strokeWidth="1.3" strokeLinejoin="round" />
      </g>
      <g className="figure figure-child child-3" style={{ ['--ci' as string]: 2 }}>
        <circle cx="182" cy="172" r="10" fill="#ffffff" stroke={BLUE} strokeWidth="1.4" />
        <path d="M 168 200 Q 168 184 182 182 Q 196 184 196 200 Z" fill={WARM} stroke={BLUE} strokeWidth="1.3" strokeLinejoin="round" />
      </g>
      <g className="figure figure-child child-4" style={{ ['--ci' as string]: 3 }}>
        <circle cx="224" cy="146" r="10" fill="#ffffff" stroke={BLUE} strokeWidth="1.4" />
        <path d="M 210 192 Q 210 168 224 166 Q 238 168 238 192 Z" fill={BLUE_FILL} stroke={BLUE} strokeWidth="1.3" strokeLinejoin="round" />
      </g>

      {/* Connecting attention lines from children to card */}
      <g className="links" opacity="0.5">
        <path d="M 64 144 Q 100 130 120 134" fill="none" stroke={GOLD} strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M 104 168 Q 116 154 124 146" fill="none" stroke={GOLD} strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M 176 168 Q 164 154 156 146" fill="none" stroke={GOLD} strokeWidth="0.8" strokeDasharray="2 3" />
        <path d="M 216 144 Q 180 130 160 134" fill="none" stroke={GOLD} strokeWidth="0.8" strokeDasharray="2 3" />
      </g>
    </svg>
  )
}

function SceneSpeech() {
  // Therapist + child + flashcard + speech bubbles
  return (
    <svg viewBox="0 0 280 240" className="scene scene-speech" aria-hidden="true">
      {/* Desk line */}
      <line x1="20" y1="200" x2="260" y2="200" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="20" y1="204" x2="260" y2="204" stroke={BLUE} strokeWidth="0.6" opacity="0.4" />

      {/* Ambient glow */}
      <circle cx="140" cy="60" r="50" fill={GOLD_FILL} className="amb amb-1" />

      {/* Therapist (left) */}
      <g className="figure figure-therapist">
        <circle cx="60" cy="92" r="16" fill={WARM} stroke={BLUE} strokeWidth="1.6" />
        <circle cx="55" cy="91" r="1.2" fill={BLUE} />
        <circle cx="65" cy="91" r="1.2" fill={BLUE} />
        <path d="M 54 97 Q 60 101 66 97" fill="none" stroke={BLUE} strokeWidth="1" strokeLinecap="round" />
        {/* body / coat */}
        <path d="M 36 142 Q 36 116 60 112 Q 84 116 84 142 L 84 200 L 36 200 Z" fill="#ffffff" stroke={BLUE} strokeWidth="1.6" strokeLinejoin="round" />
        {/* lapels */}
        <line x1="60" y1="120" x2="50" y2="172" stroke={BLUE} strokeWidth="1" />
        <line x1="60" y1="120" x2="70" y2="172" stroke={BLUE} strokeWidth="1" />
        {/* gold lapel pin */}
        <circle cx="58" cy="132" r="2.5" fill={GOLD} />
        {/* arm holding card */}
        <path d="M 82 150 Q 100 158 116 168" fill="none" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* Flashcard */}
      <g className="card">
        <rect x="116" y="138" width="48" height="56" fill="#ffffff" stroke={BLUE} strokeWidth="1.5" rx="2" />
        {/* apple icon on card */}
        <circle cx="140" cy="160" r="10" fill={GOLD_FILL} stroke={GOLD} strokeWidth="1.3" />
        <path d="M 140 148 Q 142 145 144 148" fill="none" stroke={BLUE} strokeWidth="1.1" strokeLinecap="round" />
        <line x1="140" y1="146" x2="140" y2="150" stroke={BLUE} strokeWidth="1.1" strokeLinecap="round" />
        {/* word lines */}
        <line x1="124" y1="178" x2="156" y2="178" stroke={BLUE} strokeWidth="1" strokeLinecap="round" opacity="0.65" />
        <line x1="128" y1="184" x2="152" y2="184" stroke={BLUE} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      </g>

      {/* Child (right) */}
      <g className="figure figure-child">
        <circle cx="220" cy="108" r="13" fill="#ffffff" stroke={BLUE} strokeWidth="1.6" />
        <circle cx="216" cy="107" r="1.1" fill={BLUE} />
        <circle cx="224" cy="107" r="1.1" fill={BLUE} />
        <ellipse cx="220" cy="113" rx="2.5" ry="1.5" fill="none" stroke={BLUE} strokeWidth="1" />
        {/* body */}
        <path d="M 200 152 Q 200 130 220 128 Q 240 130 240 152 L 240 200 L 200 200 Z" fill={BLUE_FILL} stroke={BLUE} strokeWidth="1.5" strokeLinejoin="round" />
      </g>

      {/* Speech bubble from child */}
      <g className="speech-bubble">
        <path
          d="M 196 76 Q 196 64 208 64 L 256 64 Q 268 64 268 76 L 268 96 Q 268 108 256 108 L 224 108 L 214 118 L 218 108 L 208 108 Q 196 108 196 96 Z"
          fill="#ffffff"
          stroke={BLUE}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* wave inside bubble */}
        <path d="M 208 88 Q 216 78 224 88 Q 232 98 240 88 Q 248 78 256 88" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" className="bubble-wave" />
      </g>
    </svg>
  )
}

function SceneMotor() {
  // Balance beam scene with child standing arms-out, therapy ball nearby
  return (
    <svg viewBox="0 0 280 240" className="scene scene-motor" aria-hidden="true">
      {/* Floor */}
      <line x1="10" y1="222" x2="270" y2="222" stroke={BLUE} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="226" x2="270" y2="226" stroke={BLUE} strokeWidth="0.5" opacity="0.3" />

      {/* Floor dots (background) */}
      <g opacity="0.35">
        <circle cx="30" cy="218" r="1" fill={BLUE} />
        <circle cx="50" cy="216" r="1" fill={BLUE} />
        <circle cx="250" cy="218" r="1" fill={BLUE} />
      </g>

      {/* Balance beam */}
      <g className="beam">
        <rect x="70" y="186" width="140" height="10" fill={WARM} stroke={BLUE} strokeWidth="1.5" rx="1" />
        {/* support legs */}
        <line x1="86" y1="196" x2="78" y2="222" stroke={BLUE} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="194" y1="196" x2="202" y2="222" stroke={BLUE} strokeWidth="1.4" strokeLinecap="round" />
        {/* wood grain */}
        <line x1="80" y1="190" x2="200" y2="190" stroke={BLUE} strokeWidth="0.4" opacity="0.4" />
      </g>

      {/* Therapy ball */}
      <g className="ball">
        <circle cx="244" cy="200" r="22" fill={GOLD_FILL} stroke={BLUE} strokeWidth="1.5" />
        <path d="M 224 200 Q 244 196 264 200" fill="none" stroke={BLUE} strokeWidth="0.8" opacity="0.5" />
        <path d="M 244 178 Q 248 200 244 222" fill="none" stroke={BLUE} strokeWidth="0.8" opacity="0.5" />
        {/* highlight */}
        <ellipse cx="237" cy="190" rx="4" ry="3" fill="#ffffff" opacity="0.7" />
      </g>

      {/* Child on beam (arms out for balance) */}
      <g className="figure figure-balancer">
        {/* head */}
        <circle cx="140" cy="92" r="14" fill={WARM} stroke={BLUE} strokeWidth="1.6" />
        <circle cx="135" cy="91" r="1.1" fill={BLUE} />
        <circle cx="145" cy="91" r="1.1" fill={BLUE} />
        <path d="M 134 96 Q 140 100 146 96" fill="none" stroke={BLUE} strokeWidth="1" strokeLinecap="round" />
        {/* torso */}
        <path d="M 128 108 L 128 154 L 152 154 L 152 108 Z" fill={BLUE_FILL} stroke={BLUE} strokeWidth="1.5" strokeLinejoin="round" />
        {/* arms outstretched (animated) */}
        <g className="arms">
          <line x1="128" y1="118" x2="92" y2="124" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="152" y1="118" x2="188" y2="124" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" />
          {/* gold balance dots at hand tips */}
          <circle cx="90" cy="124" r="2.5" fill={GOLD} />
          <circle cx="190" cy="124" r="2.5" fill={GOLD} />
        </g>
        {/* legs */}
        <line x1="134" y1="154" x2="130" y2="186" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" />
        <line x1="146" y1="154" x2="150" y2="186" stroke={BLUE} strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Motion arc indicator */}
      <path
        d="M 92 132 Q 140 144 188 132"
        fill="none"
        stroke={GOLD}
        strokeWidth="0.9"
        strokeDasharray="2 3"
        opacity="0.6"
        className="motion-arc"
      />
    </svg>
  )
}

function SceneBehavior() {
  // PECS-style: 4 picture cards + hand reaching, with a star "reward" lighting up
  return (
    <svg viewBox="0 0 280 240" className="scene scene-behavior" aria-hidden="true">
      {/* Background subtle grid */}
      <g opacity="0.18">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`gx${i}`} x1={30 + i * 56} y1="30" x2={30 + i * 56} y2="210" stroke={BLUE} strokeWidth="0.5" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line key={`gy${i}`} x1="30" y1={30 + i * 56} x2="254" y2={30 + i * 56} stroke={BLUE} strokeWidth="0.5" />
        ))}
      </g>

      {/* Reward star (top) */}
      <g className="reward">
        <path
          d="M 140 36 L 146 52 L 164 52 L 150 62 L 156 80 L 140 70 L 124 80 L 130 62 L 116 52 L 134 52 Z"
          fill={GOLD_FILL}
          stroke={GOLD}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="140" cy="58" r="3" fill={GOLD} />
      </g>

      {/* 4 PECS cards in a row */}
      <g className="cards">
        {/* Card 1 — sun */}
        <g className="pecs-card" style={{ ['--pi' as string]: 0 }}>
          <rect x="22" y="106" width="56" height="68" fill="#ffffff" stroke={BLUE} strokeWidth="1.5" rx="3" />
          <circle cx="50" cy="130" r="9" fill={GOLD_FILL} stroke={GOLD} strokeWidth="1.3" />
          <g stroke={GOLD} strokeWidth="1.2" strokeLinecap="round">
            <line x1="50" y1="118" x2="50" y2="122" />
            <line x1="50" y1="138" x2="50" y2="142" />
            <line x1="38" y1="130" x2="42" y2="130" />
            <line x1="58" y1="130" x2="62" y2="130" />
          </g>
          <line x1="30" y1="156" x2="70" y2="156" stroke={BLUE} strokeWidth="0.9" opacity="0.6" />
          <line x1="32" y1="162" x2="68" y2="162" stroke={BLUE} strokeWidth="0.9" opacity="0.4" />
        </g>

        {/* Card 2 — heart */}
        <g className="pecs-card" style={{ ['--pi' as string]: 1 }}>
          <rect x="86" y="106" width="56" height="68" fill="#ffffff" stroke={BLUE} strokeWidth="1.5" rx="3" />
          <path
            d="M 114 145 C 100 132, 94 122, 102 116 C 110 110, 114 116, 114 120 C 114 116, 118 110, 126 116 C 134 122, 128 132, 114 145 Z"
            fill={BLUE_FILL}
            stroke={BLUE}
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <line x1="94" y1="156" x2="134" y2="156" stroke={BLUE} strokeWidth="0.9" opacity="0.6" />
          <line x1="96" y1="162" x2="132" y2="162" stroke={BLUE} strokeWidth="0.9" opacity="0.4" />
        </g>

        {/* Card 3 — checkmark (the chosen / target one) */}
        <g className="pecs-card pecs-card-active" style={{ ['--pi' as string]: 2 }}>
          <rect x="150" y="106" width="56" height="68" fill={GOLD_FILL} stroke={GOLD} strokeWidth="1.8" rx="3" />
          <path
            d="M 164 132 L 174 142 L 192 122"
            fill="none"
            stroke={GOLD}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="158" y1="156" x2="198" y2="156" stroke={GOLD} strokeWidth="1" opacity="0.7" />
          <line x1="160" y1="162" x2="196" y2="162" stroke={GOLD} strokeWidth="1" opacity="0.5" />
        </g>

        {/* Card 4 — circle */}
        <g className="pecs-card" style={{ ['--pi' as string]: 3 }}>
          <rect x="214" y="106" width="44" height="68" fill="#ffffff" stroke={BLUE} strokeWidth="1.5" rx="3" />
          <circle cx="236" cy="132" r="10" fill="none" stroke={BLUE} strokeWidth="1.4" />
          <line x1="220" y1="156" x2="252" y2="156" stroke={BLUE} strokeWidth="0.9" opacity="0.6" />
          <line x1="222" y1="162" x2="250" y2="162" stroke={BLUE} strokeWidth="0.9" opacity="0.4" />
        </g>
      </g>

      {/* Hand reaching to active card */}
      <g className="hand">
        {/* index finger pointing */}
        <path
          d="M 178 220 Q 178 200 178 185 L 178 156 L 174 156 L 174 196 L 168 196 L 168 220 Z"
          fill={WARM}
          stroke={BLUE}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* knuckle line */}
        <line x1="174" y1="180" x2="178" y2="180" stroke={BLUE} strokeWidth="0.6" opacity="0.4" />
      </g>
    </svg>
  )
}

function SceneSensory() {
  // Child on therapy swing, hanging from ceiling mount, with motion arc
  return (
    <svg viewBox="0 0 280 240" className="scene scene-sensory" aria-hidden="true">
      {/* Ceiling mount */}
      <line x1="60" y1="20" x2="220" y2="20" stroke={BLUE} strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="24" x2="220" y2="24" stroke={BLUE} strokeWidth="0.5" opacity="0.4" />
      <circle cx="120" cy="20" r="3" fill={BLUE} />
      <circle cx="160" cy="20" r="3" fill={BLUE} />

      {/* Ambient glow */}
      <circle cx="140" cy="160" r="80" fill={GOLD_FILL} className="amb amb-1" />

      {/* Swing assembly — animated as a unit */}
      <g className="swing">
        {/* Ropes */}
        <line x1="120" y1="22" x2="100" y2="142" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="160" y1="22" x2="180" y2="142" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
        {/* Swing platform (cocoon style) */}
        <path
          d="M 90 142 Q 140 122 190 142 Q 196 168 180 192 Q 140 208 100 192 Q 84 168 90 142 Z"
          fill={WARM}
          stroke={BLUE}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Inside shadow */}
        <path d="M 96 152 Q 140 140 184 152" fill="none" stroke={BLUE} strokeWidth="0.7" opacity="0.4" />

        {/* Child seated */}
        <g className="figure figure-swinger">
          {/* head */}
          <circle cx="140" cy="156" r="13" fill="#ffffff" stroke={BLUE} strokeWidth="1.6" />
          <circle cx="136" cy="155" r="1.1" fill={BLUE} />
          <circle cx="144" cy="155" r="1.1" fill={BLUE} />
          {/* happy smile */}
          <path d="M 134 160 Q 140 166 146 160" fill="none" stroke={BLUE} strokeWidth="1.2" strokeLinecap="round" />
          {/* body peeking out */}
          <path d="M 130 169 L 130 184 L 150 184 L 150 169 Z" fill={BLUE_FILL} stroke={BLUE} strokeWidth="1.3" strokeLinejoin="round" />
        </g>
      </g>

      {/* Motion arc beneath */}
      <path
        d="M 80 220 Q 140 200 200 220"
        fill="none"
        stroke={GOLD}
        strokeWidth="1.1"
        strokeDasharray="3 4"
        opacity="0.7"
        className="motion-arc"
      />

      {/* Floor line */}
      <line x1="20" y1="228" x2="260" y2="228" stroke={BLUE} strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}

function SceneOT() {
  // Table-top fine motor: hand picking up colored beads/blocks
  return (
    <svg viewBox="0 0 280 240" className="scene scene-ot" aria-hidden="true">
      {/* Ambient */}
      <circle cx="80" cy="60" r="36" fill={BLUE_FILL_SOFT} />

      {/* Table */}
      <rect x="20" y="170" width="240" height="6" fill={WARM} stroke={BLUE} strokeWidth="1.5" />
      <line x1="20" y1="176" x2="260" y2="176" stroke={BLUE} strokeWidth="0.5" opacity="0.4" />
      {/* table legs */}
      <line x1="40" y1="176" x2="40" y2="222" stroke={BLUE} strokeWidth="1.5" />
      <line x1="240" y1="176" x2="240" y2="222" stroke={BLUE} strokeWidth="1.5" />
      <line x1="20" y1="224" x2="260" y2="224" stroke={BLUE} strokeWidth="1" opacity="0.5" />

      {/* Blocks on table — staggered heights */}
      <g className="blocks">
        <rect x="50" y="150" width="18" height="20" fill={WARM} stroke={BLUE} strokeWidth="1.3" rx="1" className="block block-1" />
        <rect x="74" y="138" width="18" height="32" fill={GOLD_FILL} stroke={GOLD} strokeWidth="1.5" rx="1" className="block block-2" />
        <rect x="98" y="158" width="18" height="12" fill={BLUE_FILL} stroke={BLUE} strokeWidth="1.3" rx="1" className="block block-3" />
      </g>

      {/* Beads strung */}
      <g className="beads">
        <circle cx="158" cy="162" r="5" fill={GOLD} stroke={BLUE} strokeWidth="1" className="bead bead-1" />
        <circle cx="172" cy="162" r="5" fill={WARM} stroke={BLUE} strokeWidth="1" className="bead bead-2" />
        <circle cx="186" cy="162" r="5" fill={BLUE_FILL} stroke={BLUE} strokeWidth="1" className="bead bead-3" />
        <circle cx="200" cy="162" r="5" fill={GOLD_FILL} stroke={GOLD} strokeWidth="1" className="bead bead-4" />
        {/* string */}
        <line x1="150" y1="162" x2="208" y2="162" stroke={BLUE} strokeWidth="0.8" opacity="0.5" />
      </g>

      {/* Hand from above with pinch grip */}
      <g className="hand">
        {/* arm */}
        <path
          d="M 200 8 L 220 8 L 218 60 Q 214 88 198 100 L 188 108 L 184 102 L 180 92 L 178 80 L 200 60 Z"
          fill={WARM}
          stroke={BLUE}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        {/* thumb */}
        <path
          d="M 200 100 Q 196 108 192 116 Q 192 124 200 124 Q 208 124 208 116 Q 208 108 208 100"
          fill={WARM}
          stroke={BLUE}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* index finger */}
        <path
          d="M 188 108 Q 184 120 184 132 Q 184 140 192 140 Q 200 140 200 132 Q 200 120 196 108"
          fill={WARM}
          stroke={BLUE}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* pinch focus dot */}
        <circle cx="194" cy="138" r="4" fill={GOLD} className="pinch-dot" />
        {/* concentric rings around focus */}
        <circle cx="194" cy="138" r="10" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.7" className="pinch-ring r1" />
        <circle cx="194" cy="138" r="16" fill="none" stroke={GOLD} strokeWidth="0.9" opacity="0.5" className="pinch-ring r2" />
        <circle cx="194" cy="138" r="22" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.3" className="pinch-ring r3" />
      </g>
    </svg>
  )
}

function SceneTuina() {
  // Massage table + reclining child + two therapist hands applying pressure + acupoints
  return (
    <svg viewBox="0 0 280 240" className="scene scene-tuina" aria-hidden="true">
      {/* Ambient golden glow over child's back */}
      <ellipse cx="160" cy="148" rx="80" ry="22" fill={GOLD_FILL} className="amb amb-1" />

      {/* Massage table */}
      <rect x="30" y="170" width="230" height="14" fill={WARM} stroke={BLUE} strokeWidth="1.6" rx="2" />
      <line x1="30" y1="184" x2="260" y2="184" stroke={BLUE} strokeWidth="0.5" opacity="0.4" />
      {/* legs */}
      <line x1="50" y1="184" x2="46" y2="220" stroke={BLUE} strokeWidth="1.4" />
      <line x1="240" y1="184" x2="244" y2="220" stroke={BLUE} strokeWidth="1.4" />
      <line x1="20" y1="222" x2="260" y2="222" stroke={BLUE} strokeWidth="1" opacity="0.5" />

      {/* Child reclining on side */}
      <g className="child">
        {/* head */}
        <circle cx="78" cy="142" r="14" fill={WARM} stroke={BLUE} strokeWidth="1.6" />
        {/* eyes (closed, content) */}
        <path d="M 71 142 Q 74 144 77 142" fill="none" stroke={BLUE} strokeWidth="1" strokeLinecap="round" />
        <path d="M 79 142 Q 82 144 85 142" fill="none" stroke={BLUE} strokeWidth="1" strokeLinecap="round" />
        {/* peaceful smile */}
        <path d="M 73 148 Q 78 152 83 148" fill="none" stroke={BLUE} strokeWidth="1" strokeLinecap="round" />
        {/* body — curved torso along table */}
        <path
          d="M 92 142 Q 130 130 200 142 Q 234 144 246 158 L 246 170 Q 200 174 92 170 Z"
          fill="#ffffff"
          stroke={BLUE}
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        {/* spine curve */}
        <path
          d="M 96 152 Q 150 144 230 156"
          fill="none"
          stroke={BLUE}
          strokeWidth="0.7"
          strokeDasharray="2 3"
          opacity="0.6"
          className="spine"
        />
        {/* legs poking out */}
        <path d="M 234 170 Q 252 174 256 168" fill="none" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Acupoints along the spine */}
      <g className="points">
        <circle cx="120" cy="150" r="3.5" fill={GOLD} className="point" style={{ ['--pi' as string]: 0 }} />
        <circle cx="150" cy="148" r="3.5" fill={GOLD} className="point" style={{ ['--pi' as string]: 1 }} />
        <circle cx="180" cy="150" r="3.5" fill={GOLD} className="point" style={{ ['--pi' as string]: 2 }} />
        <circle cx="210" cy="154" r="3.5" fill={GOLD} className="point" style={{ ['--pi' as string]: 3 }} />
      </g>

      {/* Two therapist hands above */}
      <g className="hands">
        {/* left hand */}
        <g className="hand hand-left">
          <path
            d="M 130 90 L 156 90 L 154 130 L 150 138 L 144 138 L 142 132 L 138 134 L 134 130 L 130 132 L 128 124 Z"
            fill={WARM}
            stroke={BLUE}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* finger separators */}
          <path d="M 142 110 L 142 130" stroke={BLUE} strokeWidth="0.7" opacity="0.5" />
          <path d="M 148 110 L 150 130" stroke={BLUE} strokeWidth="0.7" opacity="0.5" />
        </g>
        {/* right hand */}
        <g className="hand hand-right">
          <path
            d="M 184 96 L 210 96 L 208 134 L 204 142 L 198 142 L 196 136 L 192 138 L 188 134 L 184 136 L 182 128 Z"
            fill={WARM}
            stroke={BLUE}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M 196 116 L 196 136" stroke={BLUE} strokeWidth="0.7" opacity="0.5" />
          <path d="M 202 116 L 204 136" stroke={BLUE} strokeWidth="0.7" opacity="0.5" />
        </g>
      </g>

      {/* Steam/qi wisps rising from points */}
      <g className="wisps" opacity="0.5">
        <path d="M 120 144 Q 122 134 120 124" fill="none" stroke={GOLD} strokeWidth="0.9" strokeLinecap="round" />
        <path d="M 180 144 Q 178 134 180 124" fill="none" stroke={GOLD} strokeWidth="0.9" strokeLinecap="round" />
      </g>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────

const SCENES: Record<string, () => React.JSX.Element> = {
  early: SceneEarly,
  inclusion: SceneInclusion,
  speech: SceneSpeech,
  motor: SceneMotor,
  behavior: SceneBehavior,
  sensory: SceneSensory,
  ot: SceneOT,
  tuina: SceneTuina,
}

export default function ProgramArt({ slug }: { slug: string }) {
  const [lottieAvailable, setLottieAvailable] = useState(false)
  const checkedRef = useRef(false)

  useEffect(() => {
    if (checkedRef.current) return
    checkedRef.current = true
    const url = LOTTIE_FILES[slug]
    if (!url) return
    // HEAD check — only swap to Lottie if the file actually exists
    fetch(url, { method: 'HEAD' })
      .then((res) => {
        if (res.ok && (res.headers.get('content-length') || '1') !== '0') {
          setLottieAvailable(true)
        }
      })
      .catch(() => {
        /* keep SVG fallback */
      })
  }, [slug])

  if (lottieAvailable) {
    return (
      <div className="art-lottie">
        <DotLottieReact
          src={LOTTIE_FILES[slug]}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    )
  }

  const Scene = SCENES[slug]
  return Scene ? <Scene /> : null
}
