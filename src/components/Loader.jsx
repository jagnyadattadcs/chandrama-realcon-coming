import React from "react";
import styled, { keyframes } from "styled-components";

// Full-screen overlay
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Stroke line drawing
const draw = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

// Fill fade-in
const fillIn = keyframes`
  from { fill: transparent; opacity: 0; }
  to { fill: #FFD700; opacity: 1; }
`;

// SVG container: separate rules for mobile and desktop
const SvgText = styled.svg`
  /* Mobile-first */
  width: 90vw;
  max-width: 680px;
  height: auto; /* viewBox controls aspect */

  /* Tablet/Desktop */
  @media (min-width: 768px) {
    width: 75vw;
  }

  /* Large Desktop */
  @media (min-width: 1200px) {
    width: 680px;
    height: 180px; /* viewBox controls aspect */
  }
`;

// Shared base for the two text layers
const sharedText = `
  font-weight: 900;
  font-family: Arial, Helvetica, sans-serif;
  /* Mobile */
  font-size: 42px;
  letter-spacing: 6px;

  /* Tablet/Desktop */
  @media (min-width: 768px) {
    font-size: 72px;
    letter-spacing: 12px;
  }

  /* Large Desktop */
  @media (min-width: 1200px) {
    font-size: 100px;
    letter-spacing: 15px;
  }
`;

const StrokeText = styled.text`
  ${sharedText}

  stroke: #000000;
  /* Mobile */
  stroke-width: 2px;
  stroke-linejoin: round;
  stroke-linecap: round;
  fill: transparent;

  /* Tablet/Desktop */
  @media (min-width: 768px) {
    stroke-width: 2.5px;
  }

  /* Large Desktop */
  @media (min-width: 1200px) {
    stroke-width: 3px;
  }

  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: ${draw} 1.5s ease forwards; /* faster */
`;

const FillText = styled.text`
  ${sharedText}

  fill: #FFD700;
  opacity: 0;
  animation: ${fillIn} 0.8s ease forwards;
  animation-delay: 1.5s; /* stroke ke baad fill aayega */
`;

const FasterText = styled.text`
  /* Mobile */
  font-size: 14px;
  font-weight: 600;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 2.5px;

  /* Tablet/Desktop */
  @media (min-width: 768px) {
    font-size: 18px;
    letter-spacing: 4px;
  }

  /* Large Desktop */
  @media (min-width: 1200px) {
    font-size: 24px;
    letter-spacing: 5px;
  }

  fill: #FFD700; /* gold */
  opacity: 0;
  animation: ${fillIn} 0.8s ease forwards;
  animation-delay: 1.7s; /* thoda jaldi aayega */
`;

const Loader = () => {
  return (
    <Overlay>
      {/* Maintain an aspect via viewBox */}
      <SvgText viewBox="0 0 500 200" preserveAspectRatio="xMidYMid meet">
        {/* Optional subtext */}
        {/* <FasterText x="115" y="35">FASTER</FasterText> */}

        {/* Fill Layer */}
        <FillText x="50%" y="60%" textAnchor="middle" dominantBaseline="middle">
          Chandrama 
        </FillText>

        {/* Stroke Layer */}
        <StrokeText x="50%" y="60%" textAnchor="middle" dominantBaseline="middle">
          Chandrama 
        </StrokeText>
      </SvgText>
    </Overlay>
  );
};

export default Loader;