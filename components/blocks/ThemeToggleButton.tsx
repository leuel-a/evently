'use client';

import {Sun, Moon} from 'lucide-react';
import {Button, type ButtonProps} from '@/components/ui/button';
import {useTheme} from '@/context/ThemeContext';
import {cn} from '@/lib/utils';

interface ThemeToggleButtonProps extends ButtonProps {}

export function ThemeToggleButton(_: ThemeToggleButtonProps) {
    const {toggleTheme} = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={cn(
                'relative w-10 h-10 bg-white dark:bg-zinc-800/50 backdrop-blur-sm border border-gray-300 dark:border-zinc-700 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-700/50 hover:border-indigo-500 rounded-xl transition-all duration-300 group overflow-hidden',
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />

            <Sun className="h-4 w-4 absolute transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
            <Moon className="h-4 w-4 absolute transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />

            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
