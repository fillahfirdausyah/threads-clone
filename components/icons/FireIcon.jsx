import React from 'react';

export const FireIcon = ({ color, width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill={color || 'white'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.5111 2.51334C17.8139 2.16486 18.2842 2.0117 18.7342 2.11501C24.749 3.49587 27.7892 10.0869 27.0742 15.9838C26.7963 18.2761 26.1097 20.0732 25.0986 21.503C25.0924 21.5117 25.0862 21.5204 25.08 21.5291C25.3097 21.4162 25.5215 21.2944 25.7198 21.1658C26.7063 20.5255 27.4304 19.6804 28.3732 18.5801C28.4871 18.4471 28.6043 18.3104 28.7255 18.1699C28.9978 17.8541 29.4097 17.6949 29.8237 17.7454C30.2377 17.796 30.5991 18.0497 30.7874 18.4218C31.6167 20.0605 32.0833 21.9131 32.0833 23.871C32.0833 30.5445 26.6734 35.9543 20 35.9543C13.3265 35.9543 7.91663 30.5445 7.91663 23.871C7.91663 19.6426 10.0895 15.9225 13.3738 13.765L13.4864 13.6516C13.5443 13.5933 13.6077 13.5408 13.6758 13.495C15.1189 12.5239 16.1552 11.7297 16.8528 10.7957C17.5118 9.91331 17.9166 8.83694 17.9166 7.20435C17.9166 5.99555 17.6934 4.84182 17.2871 3.78009C17.1221 3.34888 17.2082 2.86183 17.5111 2.51334ZM20.2853 5.41797C20.3718 6.00126 20.4166 6.59781 20.4166 7.20435C20.4166 9.31838 19.8704 10.9332 18.8558 12.2917C17.9028 13.5675 16.5838 14.5474 15.1744 15.4998L15.0539 15.6212C14.9893 15.6863 14.9178 15.744 14.8406 15.7934C12.1774 17.4985 10.4166 20.4795 10.4166 23.871C10.4166 29.1637 14.7072 33.4543 20 33.4543C25.2927 33.4543 29.5833 29.1637 29.5833 23.871C29.5833 23.0046 29.4686 22.1662 29.2538 21.3694C28.6201 22.0556 27.9207 22.7177 27.0808 23.2628C25.5421 24.2615 23.6165 24.8316 20.8333 24.8316C20.2629 24.8316 19.7648 24.4455 19.6227 23.893C19.4806 23.3406 19.7305 22.762 20.2301 22.4868C21.3615 21.8635 22.3205 21.1016 23.0574 20.0595C23.7927 19.0196 24.3561 17.6312 24.5924 15.6829C25.1038 11.465 23.3582 7.30173 20.2853 5.41797Z"
        fill={color || 'white'}
      />
    </svg>
  );
};