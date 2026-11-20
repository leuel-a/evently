import NextLink from 'next/link'
import { APP_ROUTES } from '@/config/routes';
import { Button } from '@/components/ui/button';

import type { ComponentProps } from 'react'

interface FormActionsProps {
    SubmitButtonProps?: ComponentProps<typeof Button> & { label?: string };
}

export function EventFormActions(props: FormActionsProps) {
    const { SubmitButtonProps = {} } = props;
    const { label, ...submitButtonProps } = SubmitButtonProps;

    return (

        <div className="flex gap-4 justify-end">
            <Button
                type="button"
                variant="secondary"
                className="h-12 w-80 rounded cursor-pointer"
                asChild
            >
                <NextLink href={APP_ROUTES.dashboard.events.base}>Cancel</NextLink>
            </Button>
            <Button
                type="submit"
                className="h-12 w-80 cursor-pointer rounded bg-indigo-500 hover:bg-indigo-700/80"
                {...submitButtonProps}
            >
                {label}
            </Button>
        </div>
    )

}
