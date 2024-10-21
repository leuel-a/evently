import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-full w-full bg-gradient-to-r from-indigo-700 to-indigo-400 px-6 py-10 text-center text-white">
        <h1 className="text-[min(12vw,10vw,3.5rem)]">
          Discover Your Next Great{' '}
          <span className="font-medium italic text-yellow-500">Event!</span>
        </h1>
        <p className="text-[min(5vw,10vw,1.5rem)]">
          Explore tech events, seminars, and more in your area
        </p>
        <div className="mt-8 space-x-3 font-semibold">
          <Button className="bg-white text-gray-800 hover:bg-gray-100" asChild>
            <Link href="/events">Explore Events</Link>
          </Button>
          <Button variant="outline" className="border text-gray-800 hover:bg-gray-100">
            <Link href="/auth/signup">Are you are Organizer?</Link>
          </Button>
        </div>
      </div>
      <div className="col-span-full mt-10 px-4">
        <div className="mx-auto max-w-container space-y-4">
          <h2 className="text-center text-3xl font-medium md:text-start">How Evently Works</h2>
          <div className="flex w-full flex-col justify-center gap-4 md:flex-row">
            <div className="flex flex-1 flex-col justify-start gap-6 rounded-lg border p-8 shadow-md">
              <h3 className="text-2xl font-medium">Discover</h3>
              <ul className="list-none space-y-2 text-gray-700">
                <li>
                  Browse through our curated list of events or use our powerful search function.
                </li>
                <li>
                  Filter events by date, location, category, or price to find exactly what you're
                  looking for.
                </li>
              </ul>
            </div>
            <div className="flex flex-1 flex-col justify-start gap-6 rounded-lg border p-8 shadow-md">
              <h3 className="text-2xl font-medium">Choose</h3>
              <ul className="list-none space-y-2 text-gray-700">
                <li>Once you’ve found an event that catches your eye, click for more details.</li>
                <li>Learn about the event’s agenda, speakers, venue, and more.</li>
                <li>
                  You can easily save your favorite events or go ahead and register directly from
                  the platform.
                </li>
              </ul>
            </div>
            <div className="flex flex-1 flex-col justify-start gap-6 rounded-lg border p-8 shadow-md">
              <h3 className="text-2xl font-medium">Attend</h3>
              <ul className="list-none space-y-2 text-gray-700">
                <li>
                  After registration, you'll receive all the details you need to attend, including
                  reminders and updates.
                </li>
                <li>
                  Whether it's an online event or in-person, Evently ensures you're always informed
                  so you can focus on enjoying the experience.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
