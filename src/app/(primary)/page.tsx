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
    </div>
  )
}
