'use client';

import { useState } from 'react';

import Image from 'next/image';

const NewThreadsPage = () => {
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
  };

  return (
    <section className="max-w-xl mx-auto px-6 mt-5 text-threads-white">
      <div className="items-start gap-3 flex w-full justify-between">
        <div>
          <Image
            src={'/Assets/img/user.png'}
            width={50}
            height={50}
            className="rounded-full object-contain"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">PixelPilot4</h3>
          <textarea
            className="w-full bg-transparent p-1 h-[50px] text-threads-white font-lato resize-none outline-none border-none"
            placeholder="Start a thread"
          />
          <div className="flex items-center justify-between">
            <Image
              onClick={() => document.querySelector('.input-field').click()}
              src={'/Assets/icon/Outline/Interface/Attach.svg'}
              width={40}
              height={40}
              className="rounded-full object-contain mt-[-8px] hover:cursor-pointer"
            />
            <input
              onChange={handleImage}
              type="file"
              className="input-field"
              hidden
            />
            {image && (
              <Image
                onClick={() => setImage(null)}
                src={'/Assets/icon/Outline/Interface/Cross.svg'}
                width={40}
                height={40}
                className="cursor-pointer rounded-full object-contain mt-[-8px] hover:cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
      {image && (
        <div className="w-full mt-3">
          <Image
            src={image}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-xl object-contain sm:mb-20"
          />
        </div>
      )}
    </section>
  );
};

export default NewThreadsPage;
