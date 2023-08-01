import React from 'react';

export const SendIcon = ({ color, width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 27 27"
      fill={color || 'white'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.4687 13.5C24.4687 13.8064 24.3026 14.0888 24.0348 14.2376L21.4671 15.664C16.3918 18.4837 11.0416 20.7772 5.49989 22.509L4.75167 22.7429C4.49547 22.8229 4.21647 22.7763 4.00022 22.6173C3.78396 22.4583 3.65625 22.2059 3.65625 21.9375L3.65625 15.4688C3.65625 15.0289 3.99422 14.6628 4.43271 14.6277L4.68846 14.6072C7.10885 14.4136 9.5106 14.0432 11.8746 13.4996C9.47741 12.9485 7.04139 12.5755 4.58651 12.3843L4.43447 12.3725C3.99523 12.3382 3.65625 11.9718 3.65625 11.5313L3.65625 5.06251C3.65625 4.79409 3.78396 4.54169 4.00022 4.3827C4.21647 4.22371 4.49547 4.1771 4.75167 4.25716L5.49988 4.49098C11.0416 6.22276 16.3918 8.51634 21.4671 11.336L24.0348 12.7624C24.3026 12.9112 24.4687 13.1936 24.4687 13.5ZM21.8876 13.5L20.6476 12.8111C15.7788 10.1062 10.652 7.89526 5.34375 6.211L5.34375 10.7545C8.64009 11.0518 11.9006 11.6664 15.0798 12.5901L15.4229 12.6898C15.7836 12.7946 16.0316 13.1252 16.0312 13.5008C16.0309 13.8765 15.7822 14.2066 15.4213 14.3107L14.9819 14.4374C11.8337 15.3455 8.60629 15.9507 5.34375 16.245L5.34375 20.789C10.652 19.1048 15.7788 16.8938 20.6476 14.1889L21.8876 13.5Z"
        fill={color || 'white'}
      />
    </svg>
  );
};