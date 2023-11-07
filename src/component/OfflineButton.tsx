import Link from 'next/link'
import React from 'react'

export default function OfflineButton() {
  return (
    <button className="bg-secondary hover:bg-offline rounded-full text-third h-[50px] cursor-pointer  text-sec font-primary text-lg">
    {" "}
    <Link  href="/_offline">
      Offline Mode{" "}
      {/* <SignalWifiConnectedNoInternet4Icon fontSize="small" /> */}
    </Link>
  </button>
  )
}
