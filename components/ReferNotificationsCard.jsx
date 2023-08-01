import React from 'react';

import Image from 'next/image';

const ReferNotificationsCard = () => {
  return (
    <div className="flex items-start w-full outline outline-0.5 outline-threads-gray text-threads-white rounded-md p-2 gap-3 mt-3">
      <Image
        src={'/Assets/img/user.png'}
        width={35}
        height={35}
        className="rounded-full object-contain"
      />
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold">PixelPilot4</h3>
          <span className="text-sm text-threads-gray">2h</span>
        </div>
        <p className="text-start font-normal">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta,
          necessitatibus.
        </p>
      </div>
    </div>
  );
};

export default ReferNotificationsCard;
