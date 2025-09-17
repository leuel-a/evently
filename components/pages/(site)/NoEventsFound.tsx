import {CalendarOff} from 'lucide-react';

export function NoEventsFound() {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 text-gray-500">
            <div className="w-12 aspect-square flex items-center justify-center border border-gray-300 rounded-full">
                <CalendarOff />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No Events Found</h2>
            <p className="text-gray-400">
                We couldn’t find any events matching your search. Try adjusting your filters or
                search terms.
            </p>
        </div>
    );
}
