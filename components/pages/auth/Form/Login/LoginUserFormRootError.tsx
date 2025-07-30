import {useFormContext} from 'react-hook-form';
import lodashGet from 'lodash/get';
import {Button} from '@/components/ui/button';
import {FormMessage} from '@/components/ui/form';
import authClient from '@/lib/auth-client';
import {BASE_ERROR_CODES} from '@/lib/codes';

export function LoginUserFormRootError() {
    const form = useFormContext();
    const {formState} = form;

    const message = lodashGet(form.formState?.errors, 'root.serverError.message', '');
    const type = lodashGet(form.formState?.errors, 'root.serverError.type', '');

    const onVerifiyButtonClick = async () => {
        await authClient.sendVerificationEmail({email: 'leuel.asfaw@gmail.com', callbackURL: '/'});
    };

    if (formState.errors.root && type === BASE_ERROR_CODES.EMAIL_NOT_VERIFIED) {
        return (
            <div>
                <FormMessage className="text-sm text-indigo-700">
                    {`${message}`}
                    <Button
                        variant="link"
                        type="button"
                        className="p-0 font-bold underline ml-2 cursor-pointer"
                        onClick={onVerifiyButtonClick}
                    >
                        verify now
                    </Button>
                </FormMessage>
            </div>
        );
    }

    return <div>{formState.errors?.root && <FormMessage className="text-sm">{message as string}</FormMessage>}</div>;
}
