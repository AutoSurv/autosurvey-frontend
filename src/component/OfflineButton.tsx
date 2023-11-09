import Link from 'next/link'
import React from 'react'

export default function OfflineButton() {
  return (
    <button className="bg-secondary hover:bg-offline  text-third hover:text-primary h-[50px] cursor-pointer  text-sec font-primary text-lg">
    {" "}
    <Link  href="/_offline">
      Offline Mode{" "}
      {/* <SignalWifiConnectedNoInternet4Icon fontSize="small" /> */}
    </Link>
  </button>
  )
}
