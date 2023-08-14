'use client';
import Image from 'next/image';
import HeaderNav from '@components/HeaderNav';

import { SendIcon } from '@components/icons/SendIcon';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const NewThreadsPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [thread, setThread] = useState('');

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setImage(reader.result);
  };

  const handleSubmit = async () => {
    const newData = new FormData();
    newData.append('userId', session?.user.id);
    newData.append('thread', thread);
    newData.append('image', fileImage);

    const response = await fetch('http://localhost:5000/v1/threads', {
      method: 'POST',
      headers: new Headers({
        Accept: '*/*',
      }),
      body: newData,
    });
    const data = await response.json();
    router.push('/');
  };

  return (
    <>
      <HeaderNav title={'New Thread'} type={'Home'} />
      <section className="max-w-xl mx-auto px-6 mt-16 text-threads-white mb-20">
        <div className="items-start gap-3 flex w-full justify-between">
          <div>
            <Image
              src={session?.user.image}
              width={50}
              height={50}
              className="rounded-full object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{session?.user.username}</h3>
            <textarea
              className="w-full bg-transparent p-1 h-[50px] text-threads-white font-lato resize-none outline-none border-none"
              placeholder="Start a thread"
              onChange={(e) => setThread(e.target.value)}
              value={thread}
            />
            <div className="flex items-center justify-between mt-3">
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
                  onClick={() => {
                    setImage(null);
                    setFileImage(null);
                  }}
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
      <div className="max-w-xl mx-auto fixed bottom-0 right-0 left-0 p-4 flex justify-between bg-threads-bg post-separator">
        <p className="text-threads-white">Post Thread</p>
        {thread.length > 0 || image ? (
          <>
            <button onClick={handleSubmit} className="cursor-pointer">
              <SendIcon width={30} height={30} />
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default NewThreadsPage;
