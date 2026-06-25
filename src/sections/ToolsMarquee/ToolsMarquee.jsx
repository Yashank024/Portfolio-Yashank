import { memo } from 'react';
import './ToolsMarquee.css';

// Row 1: AI/ML & Python Tools
const ROW1 = [
  {
    name: 'Python',
    svg: (
      <svg viewBox="0 0 110 110" width="26" height="26">
        <path fill="#3776AB" d="M55 9.17c-25.22 0-23.75 10.94-23.75 10.94l.01 11.23h24.08v3.42H21.57S9.17 33.15 9.17 58.2c0 25.04 10.77 24.1 10.77 24.1h6.41V72.93c0-10.23 8.35-18.73 18.58-18.73h24.08c10.23 0 18.58-8.35 18.58-18.58V20.11S97.83 9.17 55 9.17zm-14.9 8.02c2.72 0 4.93 2.21 4.93 4.93 0 2.72-2.21 4.93-4.93 4.93a4.93 4.93 0 0 1-4.93-4.93c0-2.72 2.21-4.93 4.93-4.93z"/>
        <path fill="#FFD343" d="M55 100.83c25.22 0 23.75-10.94 23.75-10.94l-.01-11.23H54.66v-3.42h33.77s12.4 1.61 12.4-23.44c0-25.04-10.77-24.1-10.77-24.1h-6.41v9.37c0 10.23-8.35 18.73-18.58 18.73H51.01c-10.23 0-18.58 8.35-18.58 18.58v15.51s-10.25 10.94 32.57 10.94zm14.9-8.02c-2.72 0-4.93-2.21-4.93-4.93 0-2.72 2.21-4.93 4.93-4.93a4.93 4.93 0 0 1 4.93 4.93c0 2.72-2.21 4.93-4.93 4.93z"/>
      </svg>
    )
  },
  {
    name: 'Google Gemini API',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <path fill="url(#gemini-grad-2)" d="M12 2s.5 4.5 3.5 7.5S22 13 22 13s-4.5.5-7.5 3.5S12 24 12 24s-.5-4.5-3.5-7.5S2 13 2 13s4.5-.5 7.5-3.5S12 2z"/>
        <defs>
          <linearGradient id="gemini-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" />
            <stop offset="50%" stopColor="#9B72CB" />
            <stop offset="100%" stopColor="#D96B43" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: 'ChromaDB',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <circle cx="8" cy="12" r="5" fill="#3B82F6" opacity="0.85" />
        <circle cx="16" cy="12" r="5" fill="#F59E0B" opacity="0.85" />
      </svg>
    )
  },
  {
    name: 'Hugging Face',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="19">🤗</text>
      </svg>
    )
  },
  {
    name: 'Git',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <path fill="#F05032" d="M22.6 11.3L12.7 1.4c-.4-.4-1-.4-1.4 0L9 3.5l3.3 3.3c.4-.1.8 0 1.1.3.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0-.3-.3-.4-.7-.3-1.1L8.4 4.1 2.2 10.3c-.4.4-.4 1 0 1.4l9.9 9.9c.4.4 1 .4 1.4 0l9.1-9.1c.4-.3.4-1 0-1.4zM12 18c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm0-3c-.6 0-1-.4-1-1v-2c0-.6.4-1 1-1s1 .4 1 1v2c0 .6-.4 1-1 1z" />
      </svg>
    )
  },
  {
    name: 'GitHub',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <path fill="#1C1510" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    )
  }
];

// Row 2: Frontend & Interactive Technologies
const ROW2 = [
  {
    name: 'JavaScript',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <rect width="24" height="24" fill="#F7DF1E" rx="4" />
        <path d="M12 18.5c0 .8-.5 1.5-1.3 1.5-.7 0-1.2-.5-1.2-1.2h.8c0 .3.2.5.4.5.3 0 .5-.2.5-.5v-4.5h.8v4.2zm4.5 1.2c-.5.5-1.2.7-1.8.7-.9 0-1.6-.6-1.6-1.6 0-1.1.7-1.7 1.7-1.7.5 0 1 .2 1.3.5l-.5.5c-.2-.2-.5-.3-.8-.3-.6 0-1 .4-1 1s.4 1 1 1c.4 0 .7-.2.9-.4v-.6h-1v-.7h1.8v1.6z" fill="#000000" />
      </svg>
    )
  },
  {
    name: 'React.js',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <path fill="#61DAFB" d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-1 9.5l-2.5-2.5h5L11 13.5z" opacity="0.15" />
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        <path stroke="#61DAFB" strokeWidth="1" fill="none" d="M12 6a15.5 15.5 0 0 1 0 12A15.5 15.5 0 0 1 12 6z" transform="rotate(30 12 12)" />
        <path stroke="#61DAFB" strokeWidth="1" fill="none" d="M12 6a15.5 15.5 0 0 1 0 12A15.5 15.5 0 0 1 12 6z" transform="rotate(90 12 12)" />
        <path stroke="#61DAFB" strokeWidth="1" fill="none" d="M12 6a15.5 15.5 0 0 1 0 12A15.5 15.5 0 0 1 12 6z" transform="rotate(150 12 12)" />
      </svg>
    )
  },
  {
    name: 'Next.js',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <rect width="24" height="24" fill="#000000" rx="12" />
        <path d="M18.24 19l-7.74-10.12V19H9.28V5h1.22l7.74 10.12V5h1.22v14h-1.22z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    name: 'Three.js',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <rect width="24" height="24" fill="#000000" rx="4" />
        <path d="M6 18l6-12 6 12H6z" fill="#FFFFFF" />
      </svg>
    )
  },
  {
    name: 'WebGL',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <circle cx="12" cy="7" r="4.5" fill="none" stroke="#E11D48" strokeWidth="2.5" />
        <circle cx="7.5" cy="15" r="4.5" fill="none" stroke="#16A34A" strokeWidth="2.5" />
        <circle cx="16.5" cy="15" r="4.5" fill="none" stroke="#2563EB" strokeWidth="2.5" />
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <path fill="#06B6D4" d="M12 6.09c-.27-.85-.92-1.42-1.92-1.42c-1.33 0-2.39.92-2.39 2.5s1.06 2.5 2.39 2.5c1 0 1.65-.57 1.92-1.42h2.32c-.37 2.05-2 3.42-4.24 3.42c-2.73 0-4.81-2.1-4.81-5s2.08-5 4.81-5c2.24 0 3.87 1.37 4.24 3.42H12zm5.72 10.37c-.36.75-.92 1.15-1.57 1.15c-.88 0-1.53-.7-1.53-2c0-1.32.65-2 1.53-2c.65 0 1.21.4 1.57 1.15h2.35c-.48-2.15-2.07-3.15-3.92-3.15c-2.48 0-4 1.77-4 4s1.52 4 4 4c1.85 0 3.44-1 3.92-3.15H17.72z" />
      </svg>
    )
  }
];

// Row 3: Backend, DB & Deployment Tools
const ROW3 = [
  {
    name: 'FastAPI',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <path fill="#05998B" d="M12 2L2 22h8l2-6 2 6h8L12 2zm0 10.5l-3.5 3.5h7L12 12.5z"/>
      </svg>
    )
  },
  {
    name: 'PHP',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <ellipse cx="12" cy="12" rx="10" ry="7" fill="#777BB4" />
        <text x="50%" y="55%" fill="#FFFFFF" fontSize="9" fontWeight="900" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif">PHP</text>
      </svg>
    )
  },
  {
    name: 'MySQL',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <path fill="#00758F" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5l-3.5-3.5h7L11 16.5z" opacity="0.15" />
        <path fill="#00758F" d="M12 3a9 9 0 0 0-9 9c0 3.32 1.8 6.22 4.5 7.8L7.8 17c-2-1.2-3.3-3.2-3.3-5.5a7.5 7.5 0 0 1 11-6.6l.8-1.5A9 9 0 0 0 12 3zm5.7 4.5L16.2 9c1 1.2 1.5 2.7 1.5 4.3c0 2.3-1.3 4.3-3.3 5.5l.3 2.7c2.7-1.5 4.5-4.5 4.5-7.8c0-2.3-.8-4.5-2.2-6.2z"/>
      </svg>
    )
  },
  {
    name: 'PaddleOCR',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#EE4C2C" strokeWidth="2" strokeDasharray="3,2" />
        <text x="50%" y="53%" fill="#EE4C2C" fontSize="9" fontWeight="900" dominantBaseline="middle" textAnchor="middle" fontFamily="sans-serif">OCR</text>
      </svg>
    )
  },
  {
    name: 'Sentence Transformers',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <circle cx="6" cy="6" r="2.5" fill="#FF8C42" />
        <circle cx="18" cy="6" r="2.5" fill="#FF8C42" />
        <circle cx="12" cy="18" r="2.5" fill="#FF8C42" />
        <line x1="6" y1="6" x2="12" y2="18" stroke="#1C1510" strokeWidth="1.5" />
        <line x1="18" y1="6" x2="12" y2="18" stroke="#1C1510" strokeWidth="1.5" />
        <line x1="6" y1="6" x2="18" y2="6" stroke="#1C1510" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    name: 'Vercel',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <path fill="#000000" d="M12 2L2 20h20L12 2z" />
      </svg>
    )
  },
  {
    name: 'Railway',
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <path fill="#000000" d="M2 4h6v16H2V4zm7 0h6v16H9V4zm7 0h6v16h-6V4z" />
      </svg>
    )
  }
];

const ToolsMarquee = memo(function ToolsMarquee() {
  const renderRow = (rowItems) => {
    // Duplicate the actual items 3 times to ensure infinite looping is seamless
    const list = [...rowItems, ...rowItems, ...rowItems];
    return (
      <div className="marquee-track">
        {list.map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="marquee-icon">{item.svg}</span>
            <span className="marquee-name">{item.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="tools-marquee-section">
      <div className="marquee-wrapper">
        {/* Row 1: Right to Left */}
        <div className="marquee-row marquee-row-left">
          {renderRow(ROW1)}
        </div>

        {/* Row 2: Left to Right */}
        <div className="marquee-row marquee-row-right">
          {renderRow(ROW2)}
        </div>

        {/* Row 3: Right to Left */}
        <div className="marquee-row marquee-row-left">
          {renderRow(ROW3)}
        </div>
      </div>
      <div className="marquee-bottom-shadow" />
    </section>
  );
});

export default ToolsMarquee;
