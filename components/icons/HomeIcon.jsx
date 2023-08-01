import React from 'react';

export const HomeIcon = ({ color, width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill={color || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.5964 9.22376C21.1454 7.8315 18.8546 7.8315 17.4036 9.22376L9.69292 16.6227C9.504 16.8039 9.37692 17.0401 9.32969 17.2976C8.40614 22.334 8.33797 27.4901 9.12804 32.5492L9.31558 33.75H14.2763V23.3978C14.2763 22.7074 14.836 22.1478 15.5263 22.1478H24.4737C25.1641 22.1478 25.7237 22.7074 25.7237 23.3978V33.75H30.6845L30.872 32.5492C31.6621 27.4901 31.5939 22.334 30.6703 17.2976C30.6231 17.0401 30.496 16.8039 30.3071 16.6227L22.5964 9.22376ZM15.6727 7.4199C18.091 5.09945 21.9091 5.09945 24.3273 7.4199L32.038 14.8188C32.6057 15.3634 32.9875 16.0729 33.1293 16.8467C34.1036 22.1594 34.1755 27.5983 33.3421 32.9349L33.0408 34.864C32.9162 35.6618 32.2291 36.25 31.4216 36.25H24.4737C23.7833 36.25 23.2237 35.6904 23.2237 35V24.6478H16.7763V35C16.7763 35.6904 16.2167 36.25 15.5263 36.25H8.57846C7.77099 36.25 7.08384 35.6618 6.95925 34.864L6.65798 32.9349C5.82457 27.5983 5.89648 22.1594 6.8707 16.8467C7.01258 16.0729 7.39439 15.3634 7.96201 14.8188L15.6727 7.4199Z"
        fill={color || 'white'}
      />
    </svg>
  );
};
