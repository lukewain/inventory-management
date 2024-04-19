'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';


function ThemeToggle({ initalValue }: { initalValue: Theme }) {
    const [theme, setTheme] = useState(initalValue)

    useEffect(() => {
        if (theme) {
        document.cookie = `theme=${theme};path=/;`;
        document.querySelector('html')?.setAttribute('data-theme', theme);
        } else {
            setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
    }, [theme]);

    return (
        <button type='button' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            Toggle Theme
        </button>
    )
}