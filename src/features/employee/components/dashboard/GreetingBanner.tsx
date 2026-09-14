import React, { useState } from 'react';
import { greetingHand } from '@/assets/images';
import { THEME_CONFIG } from '@/config/theme.config';

export interface GreetingBannerProps {
  displayName?: string;
  completionPercentage?: number;
}

const warmGreetings = [
  'Hello there',
  'Great to see you',
  'Welcome back',
  'Hope you’re having a lovely day',
  'Wishing you a wonderful day',
  'Good to have you here',
  'Glad you’re here',
  'Hope your day is going well',
  'Wishing you a great one',
  'Here’s to a productive day ahead',
  'Nice to see you again',
  'Hope things are going smoothly for you',
];

export const GreetingBanner: React.FC<GreetingBannerProps> = ({
  displayName = 'Subodh',
  completionPercentage,
}) => {
  const [greeting] = useState(
    () => warmGreetings[Math.floor(Math.random() * warmGreetings.length)],
  );
  const [demoCompletionPercentage] = useState(
    () => Math.floor(Math.random() * 31) + 65,
  );
  const resolvedCompletionPercentage =
    completionPercentage ?? demoCompletionPercentage;

  // SVG Circle calculations for prominent 70x70 gauge with center (35, 35) and radius 30
  const radius = 30;
  const circumference = 2 * Math.PI * radius; // ~188.5
  const strokeDash =
    (resolvedCompletionPercentage / 100) * circumference;

  return (
    <div className="bg-white p-3 sm:p-4 rounded-[8px] min-h-[110px] relative overflow-hidden flex items-center w-full isolate shadow-card border border-slate-200">
      {/* Decorative Waving Hand Asset from Figma - Positioned on Top Right */}
      <div className="absolute w-[171px] h-[172px] left-[66%] -top-3 pointer-events-none select-none z-0 hidden md:block opacity-90">
        <img
          src={greetingHand}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain select-none pointer-events-none"
        />
      </div>

      {/* Main Container */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full z-1 gap-4 sm:gap-6">
        <h1
          style={{ fontFamily: THEME_CONFIG.fonts.display, fontWeight: 700 }}
          className="text-[32px] text-[#0b4668] tracking-tight leading-[38px] select-none font-display font-bold"
        >
          {greeting}, {displayName}!
        </h1>

        {/* Profile Completion: Big 70x70 Gauge Column */}
        <div className="flex items-center z-1 sm:ml-auto mr-0">
          <div className="flex flex-col items-center gap-1.5">
            {/* Big Circular Gauge: 70x70px with cx=35, cy=35, r=30 */}
            <div className="relative w-[70px] h-[70px] shrink-0 flex items-center justify-center rounded-full bg-white">
              <svg className="w-[70px] h-[70px]" viewBox="0 0 70 70">
                {/* Track Stroke (#f1f1f1) */}
                <circle
                  cx="35"
                  cy="35"
                  r={radius}
                  stroke="#f1f1f1"
                  strokeWidth="5"
                  fill="none"
                />

                {/* Progress Arc (#0b4668 Deep Navy) */}
                <circle
                  cx="35"
                  cy="35"
                  r={radius}
                  stroke="#0b4668"
                  strokeWidth="5"
                  strokeDasharray={`${strokeDash} ${circumference}`}
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  fill="none"
                  transform="rotate(180 35 35)"
                />
              </svg>

              {/* Centered 85% label */}
              <span className="absolute font-bold text-[14px] sm:text-[15px] text-[#0b4668] tracking-[0.13px] leading-[18px]">
                {resolvedCompletionPercentage}%
              </span>
            </div>

            {/* Profile Completion label below gauge */}
            <span className="font-medium text-[12px] text-[#45464D] leading-[16px] text-center">
              Profile Completion
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
