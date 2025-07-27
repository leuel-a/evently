'use client';

import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import type {UserSignupSchemaType} from '@/app/auth/schema';
import {userSignupSchema} from '@/app/auth/schema';
import {UserSignupForm} from '@/components/pages/auth/Form/Signup/UserSignupForm';
import {createUserAction} from '../actions';

export default function Page() {
  const form = useForm<UserSignupSchemaType>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isOrganizer: false,
    },
  });

  const onSubmitHandler = async (values: UserSignupSchemaType) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const {success, error} = await createUserAction(formData);

    if (!success) {
      console.log('something went wrong while trying to create the user');
      console.log(error);
      return;
    }

    console.log('user created successfully');
    return;
  };

  return (
    <FormProvider {...form}>
      <div className="flex h-screen w-full items-center justify-center pt-20">
        <UserSignupForm handleSubmit={onSubmitHandler} />
      </div>
    </FormProvider>
  );
}
