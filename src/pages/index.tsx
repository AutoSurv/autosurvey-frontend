import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getSurveys } from './api/autosurvey'
import { useEffect, useState } from 'react'
import { AutoSurvey } from './type/type'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [allSurveys, setAllSurveys] = useState<AutoSurvey[]>([]);

  const getAllSurveys = async () => {
    const listOfSurvey = await getSurveys();
    setAllSurveys(listOfSurvey);
  }

  useEffect(() => {
    getAllSurveys();
    
  }, [])

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        {
          allSurveys.map((s: AutoSurvey, index: number) => {
            console.log(s);
            return (
              <div>
                <label>{s.locationGiven}</label>
              </div>
            )
          })
        }
      </main>
    </>
  )
}
