const Discover = ({ active }: { active?: boolean }) => {
  return active ? (
    <svg
      width="18px"
      height="16px"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.69 32.1701L7.17 29.6501C6.11 28.5901 6.11 26.8701 7.17 25.8001L13.22 19.7501C14.28 18.6901 16 18.6901 17.07 19.7501L19.59 22.2701C20.65 23.3301 20.65 25.0501 19.59 26.1201L13.54 32.1701C12.47 33.2301 10.75 33.2301 9.69 32.1701Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M19.24 38.11L11.95 27.39L1.22999 20.1C-0.0300062 19.25 -0.380006 17.55 0.439994 16.27L5.35999 8.54003C5.92999 7.65003 6.81999 7.02003 7.84999 6.78003L37 0.0500269C38.38 -0.269973 39.62 0.970027 39.3 2.35003L32.57 31.5C32.33 32.53 31.7 33.42 30.81 33.99L23.08 38.91C21.79 39.71 20.09 39.36 19.24 38.11Z"
        fill="url(#paint1_linear)"
      />
      <path
        d="M36.99 0.0500269L23.11 3.25003L8.23999 24.87L11.95 27.39L14.47 31.1L36.08 16.23L39.28 2.35003C39.61 0.970027 38.37 -0.269973 36.99 0.0500269Z"
        fill="url(#paint2_linear)"
      />
      <path
        d="M31.71 12.29L30.28 9.43004C30.2 9.27004 30.07 9.13004 29.9 9.05004L27.04 7.62004C26.53 7.36004 26.41 6.68004 26.82 6.27004L28.64 4.45004C28.9 4.19004 29.29 4.13004 29.61 4.29004L32.97 5.97004C33.13 6.05004 33.27 6.18004 33.35 6.35004L35.03 9.71004C35.19 10.03 35.13 10.43 34.87 10.68L33.05 12.5C32.65 12.92 31.96 12.81 31.71 12.29Z"
        fill="url(#paint3_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="37.5488"
          y1="1.78908"
          x2="14.2103"
          y2="25.1276"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#38DEE6" />
          <stop offset="1" stopColor="#208890" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="27.5201"
          y1="11.8178"
          x2="-1.05524"
          y2="40.3931"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#38DEE6" />
          <stop offset="1" stopColor="#208890" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="35.9571"
          y1="3.3808"
          x2="8.15537"
          y2="31.1825"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#38DEE6" />
          <stop offset="1" stopColor="#208890" />
        </linearGradient>
        <linearGradient
          id="paint3_linear"
          x1="36.6435"
          y1="2.69443"
          x2="25.8308"
          y2="13.5071"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#246F73" />
          <stop offset="1" stopColor="#208890" />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18px"
      height="16px"
      viewBox="0 0 40 40"
    >
      <title>Icon</title>
      <path
        d="M19.59,37.81l-7-10.35-10.35-7a2.72,2.72,0,0,1-.76-3.7L6.18,9.24a3.88,3.88,0,0,1,2.4-1.7L36.73,1A1.85,1.85,0,0,1,39,3.27l-6.5,28.15a3.88,3.88,0,0,1-1.7,2.4l-7.47,4.75A2.72,2.72,0,0,1,19.59,37.81Z"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M36.73,1,23.32,4.14,9,25l3.58,2.44L15,31,35.86,16.68,39,3.27A1.85,1.85,0,0,0,36.73,1Z"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M28.27,6.65l3.15,1.58a.79.79,0,0,1,.35.35l1.58,3.15"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M12.54,27.46,8.88,25l-1,1a2.63,2.63,0,0,0,0,3.72l2.43,2.43a2.63,2.63,0,0,0,3.72,0l1-1Z"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Discover;
