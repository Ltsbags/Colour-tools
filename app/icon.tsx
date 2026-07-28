import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)',
          padding: '2px',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 4H21M16 4V11L9.2 23.5C8.1 25.5 9.6 28 11.9 28H24.1C26.4 28 27.9 25.5 26.8 23.5L20 11V4"
            stroke="#00F0FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.8 25.5C10.2 25.5 9.8 24.8 10.1 24.2L12.5 19.8C15 21 21 21 23.5 19.8L25.9 24.2C26.2 24.8 25.8 25.5 25.2 25.5H10.8Z"
            fill="#10B981"
          />
          <path
            d="M12.5 19.8L14.8 15.6C17 16.8 19 16.8 21.2 15.6L23.5 19.8C21 21 15 21 12.5 19.8Z"
            fill="#FF2A85"
          />
          <path
            d="M14.8 15.6L16.5 12.5C17.5 13.2 18.5 13.2 19.5 12.5L21.2 15.6C19 16.8 17 16.8 14.8 15.6Z"
            fill="#8B5CF6"
          />
          <circle cx="18" cy="7" r="2" fill="#FF2A85" />
          <circle cx="13" cy="10" r="1.5" fill="#00F0FF" />
          <circle cx="23" cy="9" r="1.5" fill="#FACC15" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}

