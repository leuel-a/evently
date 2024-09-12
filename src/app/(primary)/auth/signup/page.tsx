import Image from 'next/image';
import { NextPage } from 'next';
import { signIn } from '@/auth';
import githubIcon from '@/app/assets/images/github-icon.svg';

const Page: NextPage = () => {
  return (
    <main className="">
      <div className="mx-auto my-20 max-w-80 rounded-sm border px-8 py-2">
        <form
          action={async () => {
            'use server';
            await signIn('github');
          }}
          className=""
        >
          <button type="submit" className="flex w-full justify-between cursor-pointer">
            <span>Sign Up with Github</span>
            <Image src={githubIcon} alt="Github Icon" width={24} height={24} />
          </button>
        </form>
      </div>
    </main>
  );
};

export default Page;
