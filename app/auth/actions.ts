'use server';

import {ZodError} from 'zod';
import {userSignupSchema} from '@/app/auth/schema';
import {ValidationError, AppError} from '@/lib/app-error';

export type IActionState = {
  success?: boolean | undefined;
  error?: ValidationError | AppError;
};

export async function createUserAction(formData: unknown): Promise<IActionState> {
  const formValues = Object.fromEntries((formData as FormData).entries());
  try {
    const parsedUser = await userSignupSchema.parseAsync(formValues);

    console.log(parsedUser);

    return {success: true};
  } catch (e: any) {
    if (e instanceof ZodError) {
      const errors = e.flatten().fieldErrors;
      const validationError = new ValidationError(
        Object.entries(errors).map(([key, value]) => ({path: key, message: value ?? []})),
      );

      return {success: false, error: validationError};
    }

    const appError = new AppError(e.message);
    return {success: false, error: appError};
  }
}
