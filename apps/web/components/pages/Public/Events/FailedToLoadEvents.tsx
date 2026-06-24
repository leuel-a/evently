import {GetEventsPageResult} from '@/app/events/actions';
import {IActionResult} from '@/types/utils';

interface FailedToLoadEventsProps {
    error: IActionResult<GetEventsPageResult>['error'];
}

const FAILED_TO_LOAD_EVENTS_MESSAGE = 'Failed to load events';

export function FailedToLoadEvents(props: FailedToLoadEventsProps) {
    const {error} = props;
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="rounded-full bg-red-50 p-4 mb-4">
                <svg
                    className="h-8 w-8 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-800">
                {FAILED_TO_LOAD_EVENTS_MESSAGE}
            </h2>
            <p className="text-sm text-slate-500 mt-1">{String(error)}</p>
        </div>
    );
}
