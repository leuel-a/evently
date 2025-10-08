/**
 * Safely retrieves an item from localStorage with TypeScript generics support
 */
export function getItemFromLocalStorage<T>(key: string, defaultValue?: T): T | undefined {
    if (typeof window === 'undefined') {
        return defaultValue;
    }

    try {
        const item = window.localStorage.getItem(key);
        if (item === null) {
            return defaultValue;
        }

        try {
            return JSON.parse(item) as T;
        } catch {
            return item as unknown as T;
        }
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        return defaultValue;
    }
}

/**
 * Safely sets an item to localStorage with support for various data types
 */
export function setItemToLocalStorage<T>(key: string, value: T): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        if (typeof value === 'string') {
            window.localStorage.setItem(key, value);
        } else {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
    } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
    }
}
