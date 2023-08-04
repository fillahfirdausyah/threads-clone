'use client';

import { ThreadsLogo } from '@components/icons/ThreadsLogo';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
import { set } from 'mongoose';

const SignUpPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: '',
    fullname: '',
    password: '',
  });
  const [username, setUsername] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'fullname') {
      // generate 3 random number
      const random = Math.floor(Math.random() * 1000);
      if (value.length > 20) {
        const fullname = value.split(' ');
        const username = `${fullname[0]}${fullname[1]}_${random}`;
        setUsername(username.toLowerCase());
      } else {
        const fullname = value.split(' ');
        setUsername(fullname.join('').toLowerCase());
      }
    }
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/v1/auth/signup', {
        method: 'POST',
        headers: new Headers({
          Accept: '*/*',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          ...userData,
          username,
        }),
      });

      const data = await response.json();
      router.push(
        `/auth/signIn?status=${data.status}&username=${data.data.username}`
      );
      setUserData({
        email: '',
        fullname: '',
        password: '',
      });
      setUsername('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="cover min-h-screen max-w-xl mx-auto px-6 mt-2 text-center text-threads-white">
      <div className="flex items-center justify-center mt-10">
        <ThreadsLogo width={50} height={50} />
      </div>
      <h1 className="text-[50px]">Sign Up into Threads Clone</h1>
      <div className="flex justify-center items-center">
        <div className="glasseffect p-5 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-threads-white w-full sm:max-w-xl">
          <div className="flex">
            <h2 className="text-lg font-semibold flex-1">Sign Up</h2>
          </div>
          <div className="flex flex-col gap-6 mt-4">
            <input
              value={userData.fullname}
              onChange={handleInput}
              name="fullname"
              type="text"
              placeholder="Full Name"
              className="inputAuth"
            />
            <input
              value={userData.email}
              onChange={handleInput}
              name="email"
              type="text"
              placeholder="Email"
              className="inputAuth"
            />
            <div className="text-start">
              <input
                value={username}
                name="username"
                type="text"
                placeholder="username"
                className="inputAuth"
                disabled
              />
              <p className="text-threads-gray text-xs mt-1">
                Can change later in profile
              </p>
            </div>
            <input
              value={userData.password}
              onChange={handleInput}
              name="password"
              type="password"
              placeholder="password"
              className="inputAuth"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-threads-purple-500 h-10 px-3 py-1 rounded-md text-threads-white text-sm font-medium hover:bg-threads-purple-400 w-full"
            >
              Sign Up
            </button>
          </div>
          <div>
            <p className="text-threads-gray mt-4">
              Already have an account?{' '}
              <Link href={'/auth/signIn'}>
                <span className="text-threads-purple-500 cursor-pointer">
                  Sign In
                </span>
              </Link>
            </p>
          </div>
          <div>
            <p className="text-threads-gray mt-4">Or</p>
            <button
              type="button"
              onClick={() =>
                signIn('google', {
                  callbackUrl: 'http://localhost:3000/',
                })
              }
              className="bg-transparent outline outline-1 rounded-md p-2 w-full mt-4"
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
