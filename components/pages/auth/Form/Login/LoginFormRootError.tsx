import {useFormContext} from 'react-hook-form';
import lodashGet from 'lodash/get';
import {FormMessage} from '@/components/ui/form';

export function LoginFormRootError() {
    const form = useFormContext();

    const message = lodashGet(form.formState?.errors, 'root.serverError.message', '');
    const type = lodashGet(form.formState?.errors, 'root.serverError.type', '');

    return (
        <div>
            {form.formState.errors?.root && <FormMessage className="text-sm">{}</FormMessage>}
        </div>
    );
}
