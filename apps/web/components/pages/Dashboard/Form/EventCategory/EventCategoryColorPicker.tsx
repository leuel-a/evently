'use client';

import { useState } from 'react';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { ColorPicker } from '@/components/blocks/Common';
import type { EventCategorySchemaType } from '@/lib/db/schema';
import type { ControllerFieldState, ControllerRenderProps } from 'react-hook-form';
import { useDashboardSettings } from '@/context/DashboardSettingsContext';

interface EventCategoryColorPickerProps {
    field: ControllerRenderProps<EventCategorySchemaType, 'color'>;
    fieldState: ControllerFieldState;
}

const HEX_REGEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function EventCategoryColorPicker(props: EventCategoryColorPickerProps) {
    const { field, fieldState } = props;

    const [draft, setDraft] = useState<string | null>(null);
    const { categories } = useDashboardSettings();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let next = e.target.value.trim();
        if (next && !next.startsWith('#')) next = `#${next}`;

        setDraft(next);
        if (HEX_REGEX.test(next)) field.onChange(normalizeHex(next).toLowerCase());
    };

    const handleInputBlur = () => {
        setDraft(null);
        field.onBlur();
    };

    const swatches = [...new Set(categories?.colors ?? [])];
    const isSelected = (color: string) => color.toLowerCase() === field.value?.toLowerCase();

    const alreadyCreatedCategoryColors = categories?.colors ?? [];

    return (
        <Field>
            <FieldLabel>Pick Color</FieldLabel>
            <div className="flex flex-col gap-6 sm:flex-row">
                <ColorPicker
                    className="shrink-0"
                    value={field.value}
                    onChange={field.onChange}
                />

                <div className="flex w-40 flex-col gap-2">
                    <span className="text-sm text-gray-500">Preview</span>
                    <div
                        className="h-20 w-full rounded border transition-colors"
                        style={{ backgroundColor: field.value }}
                    />
                    <Input
                        ref={field.ref}
                        name={field.name}
                        value={draft ?? field.value ?? ''}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder="#6366f1"
                        maxLength={7}
                        spellCheck={false}
                        autoComplete="off"
                        aria-label="Hex color"
                        aria-invalid={fieldState.invalid}
                        className="h-10 rounded font-mono text-sm uppercase shadow-none"
                    />
                </div>
                {swatches.length > 0 && (
                    <div className="space-y-8">
                        <span className="text-sm text-gray-500">Existing Category Colors</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {swatches.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    aria-label={`Use color ${color}`}
                                    aria-pressed={isSelected(color)}
                                    onClick={() => field.onChange(color.toLowerCase())}
                                    style={{ backgroundColor: color }}
                                    className={cn(
                                        'flex size-8 cursor-pointer items-center justify-center rounded-xs',
                                        'ring-offset-2 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2',
                                        'ring-foreground/60',
                                        isSelected(color) && 'ring-2',
                                    )}
                                >
                                    {isSelected(color) && <Check className="size-4 text-white drop-shadow" />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
}

export const normalizeHex = (hex: string) =>
    hex.length === 4
        ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
        : hex;

