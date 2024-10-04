'use client'

import Image from 'next/image'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'

// icon
import { InfoIcon } from 'lucide-react'

enum Error {
  Configuration = 'Configuration',
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{' '}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">Configuration</code>
    </p>
  ),
}

// TODO: check this page out about useSearchParams: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
// TODO: use a suspense boundary when using the useSearchParams() function
const Page: NextPage = () => {
  const search = useSearchParams()
  const error = search.get('error') as Error

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <InfoIcon className="h-8 w-8" />
          <h5 className="flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            Something went wrong
          </h5>
        </div>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {errorMap[error] || 'Please contact us if this error persists.'}
        </div>
      </div>
    </div>
  )
}

export default Page
