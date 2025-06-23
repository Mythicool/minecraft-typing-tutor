import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* Import a pixelated font from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Press Start 2P', ${theme.fonts.primary};
    font-size: ${theme.fontSizes.sm};
    line-height: 1.6;
    color: ${theme.colors.ui.text};
    background: linear-gradient(135deg, 
      ${theme.colors.primary.dirt} 0%, 
      ${theme.colors.primary.stone} 50%, 
      ${theme.colors.primary.cobblestone} 100%
    );
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    /* Minecraft-style pixelated background pattern */
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
      radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 2px, transparent 2px);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 12px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${theme.colors.ui.background};
    border-radius: ${theme.borderRadius.sm};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary.stone};
    border-radius: ${theme.borderRadius.sm};
    border: 2px solid ${theme.colors.ui.background};
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primary.cobblestone};
  }
  
  /* Selection styling */
  ::selection {
    background: ${theme.colors.secondary.diamond};
    color: ${theme.colors.ui.text};
  }
  
  ::-moz-selection {
    background: ${theme.colors.secondary.diamond};
    color: ${theme.colors.ui.text};
  }
  
  /* Focus styles */
  :focus {
    outline: 2px solid ${theme.colors.secondary.diamond};
    outline-offset: 2px;
  }
  
  :focus:not(:focus-visible) {
    outline: none;
  }
  
  /* Button reset */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }
  
  /* Input reset */
  input, textarea {
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
  }
  
  /* Link reset */
  a {
    color: inherit;
    text-decoration: none;
  }
  
  /* List reset */
  ul, ol {
    list-style: none;
  }
  
  /* Heading styles */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Press Start 2P', ${theme.fonts.heading};
    font-weight: normal;
    line-height: 1.2;
    margin-bottom: ${theme.spacing.md};
  }
  
  h1 {
    font-size: ${theme.fontSizes['3xl']};
    color: ${theme.colors.secondary.gold};
    text-shadow: 2px 2px 0px ${theme.colors.ui.background};
  }
  
  h2 {
    font-size: ${theme.fontSizes['2xl']};
    color: ${theme.colors.secondary.diamond};
    text-shadow: 1px 1px 0px ${theme.colors.ui.background};
  }
  
  h3 {
    font-size: ${theme.fontSizes.xl};
    color: ${theme.colors.ui.text};
  }
  
  /* Paragraph styles */
  p {
    margin-bottom: ${theme.spacing.md};
    line-height: 1.8;
  }
  
  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  .pixelated {
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
  
  /* Animation keyframes */
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -8px, 0);
    }
    70% {
      transform: translate3d(0, -4px, 0);
    }
    90% {
      transform: translate3d(0, -2px, 0);
    }
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-2px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(2px);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(0, 191, 255, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(0, 191, 255, 0.8);
    }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInDown {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink {
    0%, 50% {
      opacity: 1;
    }
    51%, 100% {
      opacity: 0;
    }
  }

  /* Animation utility classes */
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .animate-bounce {
    animation: bounce 1s infinite;
  }

  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }

  .animate-slide-in-up {
    animation: slideInUp 0.5s ease-out;
  }

  .animate-slide-in-down {
    animation: slideInDown 0.5s ease-out;
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }

  .animate-scale-in {
    animation: scaleIn 0.3s ease-out;
  }

  /* Smooth transitions for all interactive elements */
  button, a, input, select {
    transition: all ${theme.transitions.fast};
  }

  /* Loading states */
  .loading {
    position: relative;
    overflow: hidden;
  }

  .loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
      transparent,
      rgba(255,255,255,0.2),
      transparent
    );
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }
`;
