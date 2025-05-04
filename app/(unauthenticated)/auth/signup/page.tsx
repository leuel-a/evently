'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema, SignupSchemaType } from './validation';
import { Form } from '@/components/ui/form';
import { TextInput } from '@/components/blocks/form';

export default function Page() {
	const form = useForm<SignupSchemaType>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (values: SignupSchemaType) => {
		console.log(values);
	};

	return (
		<main>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<TextInput name="firstName" placeholder="First Name" />
					<TextInput name="lastName" placeholder="Last Name" />
					<TextInput name="email" placeholder="Email" type="email" />
					<TextInput name="password" placeholder="Password" type="password" />
					<TextInput name="confirmPassword" placeholder="Confirm your password" type="password" />
				</form>
			</Form>
		</main>
	);
}
