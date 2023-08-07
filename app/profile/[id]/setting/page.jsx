'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const ProfileSetting = ({ params }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({
    fullname: '',
    username: '',
    bio: '',
    link: '',
  });

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch(
        `http://localhost:5000/v1/users/${params.id}`
      );
      const data = await response.json();
      setUserData({
        fullname: data.data.fullname,
        username: data.data.username,
        bio: data.data.bio,
        link: data.data.link,
      });
      setUserId(data.data._id);
    };

    getUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('bio', userData.bio);
      formData.append('link', userData.link);

      const response = await fetch(
        `http://localhost:5000/v1/users/${params.id}`,
        {
          method: 'PATCH',
          headers: new Headers({
            Accept: '*/*',
          }),
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status === 200) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <nav className="md:hidden w-full flex items-center justify-between py-6">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${params.id}`}>
            <Image
              src={'/Assets/icon/Outline/Interface/Cross.svg'}
              width={30}
              height={30}
            />
          </Link>
          <h2 className="text-xl text-white">Edit Profile</h2>
        </div>
        <button
          onClick={handleSumbit}
          className="text-threads-purple-500 text-base font-bold"
        >
          Done
        </button>
      </nav>
      <section className="mt-4 max-w-xl mx-auto px-3 lg:mt-28 text-threads-white">
        <div className="w-full">
          <div className="mt-5">
            <div className="w-20 h-20 rounded-full mx-auto overflow-hidden">
              <Image
                src={session?.user.image}
                width={80}
                height={80}
                className="w-full cursor-pointer"
              />
            </div>
          </div>
          <div className="mt-5">
            <form className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-white">Fullname</label>
                <input
                  name="fullname"
                  value={userData.fullname}
                  onChange={handleChange}
                  type="text"
                  className="bg-transparent outline outline-1 outline-threads-gray text-threads-gray h-10 text-sm py-[0.4rem] px-2 rounded-md w-full cursor-not-allowed"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-white">Username</label>
                <input
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  type="text"
                  className="bg-transparent outline outline-1 outline-threads-gray text-threads-gray h-10 text-sm py-[0.4rem] px-2 rounded-md w-full cursor-not-allowed"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-white">Bio</label>
                <input
                  name="bio"
                  value={userData.bio}
                  onChange={handleChange}
                  type="text"
                  className="bg-transparent outline outline-1 h-10 text-sm py-[0.4rem] px-2 rounded-md w-full focus:outline-threads-purple-500"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-white">Link</label>
                <input
                  name="link"
                  value={userData.link}
                  onChange={handleChange}
                  type="text"
                  className="bg-transparent outline outline-1 h-10 text-sm py-[0.4rem] px-2 rounded-md w-full focus:outline-threads-purple-500"
                />
              </div>
              {/* Make submit button */}
              <button
                onClick={handleSumbit}
                className="hidden lg:block bg-threads-purple-500 text-sm py-[0.4rem] h-9 px-7 mt-5 rounded-md w-full hover:bg-threads-purple-400"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileSetting;
