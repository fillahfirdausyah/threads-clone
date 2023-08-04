'use client';

import { ThreadsLogo } from '@components/icons/ThreadsLogo';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import Link from 'next/link';

const SignInPage = () => {
  const searchParams = useSearchParams();
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (searchParams.get('username')) {
      setUserCredentials({
        ...userCredentials,
        username: searchParams.get('username'),
      });
    }
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserCredentials({
      ...userCredentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: true,
        callbackUrl: 'http://localhost:3000/',
        username: userCredentials.username,
        password: userCredentials.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="cover min-h-screen max-w-xl mx-auto px-6 mt-2 text-center text-threads-white">
      <div className="flex items-center justify-center mt-10">
        <ThreadsLogo width={50} height={50} />
      </div>
      <h1 className="text-[50px]">Sign In to share with people</h1>
      <div className="flex justify-center items-center">
        <div className="glasseffect p-5 rounded-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-threads-white w-full sm:max-w-xl">
          <div className="text-center">
            <h2 className="text-lg font-semibold flex-1">Sign In</h2>
            {searchParams.get('status') === '200' && (
              <p className="text-sm text-threads-gray">
                Sign up success please login with your account
              </p>
            )}
          </div>
          <form className="flex flex-col gap-6 mt-4">
            <input
              value={userCredentials.username}
              onChange={handleInput}
              name="username"
              type="text"
              placeholder="username"
              className="inputAuth"
            />
            <input
              value={userCredentials.password}
              onChange={handleInput}
              name="password"
              type="password"
              placeholder="password"
              className="inputAuth"
            />
            <button
              onClick={handleSubmit}
              className="bg-threads-purple-500 h-10 px-3 py-1 rounded-md text-threads-white text-sm font-medium hover:bg-threads-purple-400 w-full"
            >
              Sign In
            </button>
          </form>
          <div>
            <p className="text-threads-gray mt-4">
              Don't have an account?{' '}
              <Link href={'/auth/signUp'}>
                <span className="text-threads-purple-500 cursor-pointer">
                  Sign Up
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

export default SignInPage;
