import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full w-full bg-gradient-to-r from-indigo-700 to-indigo-400 pb-10 pt-20 text-center text-white">
        <h1 className="text-7xl">
          Discover Your Next Great{' '}
          <span className="font-medium italic text-yellow-500">Event!</span>
        </h1>
        <p className="text-2xl">Explore tech events, seminars, and more in your area</p>
        <div className="mt-8 space-x-3 font-semibold">
          <Button>Explore Events</Button>
          <Button>Are you are Organizer?</Button>
        </div>
      </div>
      <div className="col-span-full mt-10 text-center">
        <div className="mx-auto max-w-container space-y-4">
          <h2 className="text-3xl font-medium text-indigo-600">How Evently Works</h2>
          <div className="flex h-96 w-full flex-wrap justify-center gap-4">
            <div className="flex-1 rounded-lg border border-indigo-600 p-4">
              <h3 className="text-2xl font-medium text-indigo-600">Discover</h3>
              <p>Browse through our curated list of events or use our powerful search function.</p>
              <p>
                Filter events by date, location, category, or price to find exactly what you're
                looking for.
              </p>
            </div>
            <div className="flex-1 rounded-lg border border-indigo-600 p-4">
              <h3 className="text-2xl font-medium text-indigo-600">Choose</h3>
            </div>
            <div className="flex-1 rounded-lg border border-indigo-600 p-4">
              <h3 className="text-2xl font-medium text-indigo-600">Attend</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
