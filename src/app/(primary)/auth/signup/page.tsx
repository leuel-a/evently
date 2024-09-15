import Image from 'next/image';
import { NextPage } from 'next';
import githubIcon from '@/app/assets/images/github-icon.svg';
import googleIcon from '@/app/assets/images/google-icon.svg';
import twitterIcon from '@/app/assets/images/twitter-icon.svg';
import { Button } from '@/components/ui/button';
import { signIn } from '@/auth';

const Page: NextPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="min-w-80 space-y-2">
        <form
          action={async () => {
            'use server';
            await signIn('github');
          }}
          className="w-full"
        >
          <Button className="flex w-full items-center gap-2 border border-black bg-white px-8 py-6 text-lg text-black hover:bg-black/20">
            <span>Sign Up with Github</span>
            <Image src={githubIcon} alt="Github Icon" className="h-6 w-6" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
