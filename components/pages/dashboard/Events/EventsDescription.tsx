'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {PenLine, X} from 'lucide-react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Events} from '@/app/generated/client';
import {Button} from '@/components/ui/button';
import {Form, FormField, FormItem, FormControl, FormMessage} from '@/components/ui/form';
import {Textarea} from '@/components/ui/textarea';
import {cn} from '@/lib/utils';

export interface EditEventDescriptionFormProps {
    event: Events;
}

export interface EventsDescriptionProps {
    event: Events;
}

const editEventDescriptionSchema = z.object({
    description: z.string(),
});

export function EventsDescription({event}: EventsDescriptionProps) {
    const [editDescription, setEditDescription] = useState<boolean>(false);

    return (
        <div className="mt-6 rounded border p-6 bg-white">
            <div className="w-full flex justify-between items-center">
                <h3 className="text-sm font-medium text-slate-600">Description</h3>
                <Button
                    variant="outline"
                    onClick={() => setEditDescription((prev) => !prev)}
                >
                    {editDescription ? <X /> : <PenLine />}
                </Button>
            </div>
            <div>
                {editDescription ? (
                    <EditEventDescriptionForm event={event} />
                ) : (
                    <p className="mt-3 text-sm text-slate-700 whitespace-pre-line">{event.description}</p>
                )}
            </div>
        </div>
    );
}

export function EditEventDescriptionForm(props: EditEventDescriptionFormProps) {
    const form = useForm({
        resolver: zodResolver(editEventDescriptionSchema),
        defaultValues: {
            description: props.event.description,
        },
    });

    return (
        <Form {...form}>
            <form className="mt-4 flex flex-col gap-2">
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    className={cn('h-32 rounded shadow-none')}
                                    placeholder="Describe your event in detail"
                                    rows={30}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4 justify-end">
                    <Button type="submit">Update</Button>
                    <Button
                        type="button"
                        variant="secondary"
                        className="border border-neutral-300"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
}
