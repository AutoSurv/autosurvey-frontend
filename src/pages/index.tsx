import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { getCountries, getOrganizations, getSurveys } from './api/autosurvey'
import { useEffect, useState } from 'react'
import { AutoSurvey, Country, Organization } from './type/type'
import { CpuInfo } from 'os'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [allSurveys, setAllSurveys] = useState<AutoSurvey[]>([]);
  const [allOrgs, setAllOrgs] = useState<Organization[]>([]);
  const [allCountries, setAllCountries] = useState<Country[]>([]);

  const getAllSurveys = async () => {
    const listOfSurvey = await getSurveys();
    setAllSurveys(listOfSurvey);
  }

  const getAllOrgs = async () => {
    const listOfOrgs = await getOrganizations();
    setAllOrgs(listOfOrgs);
  }

  const getAllCountries = async () => {
    const listOfCountries = await getCountries();
    setAllCountries(listOfCountries);
  }



  useEffect(() => {
    getAllSurveys();
    getAllOrgs();
    getAllCountries();
  }, [])

  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
        {
          allSurveys.map((s: AutoSurvey, index: number) => {
            return (
              <div>
                <label key={index}>location given: {s.locationGiven}</label>
              </div>
            )
          })
        }
        </div>

        <div>
        {
          allCountries.map((c: Country, index: number) => {
            console.log("country", c);
            return (
              <div>
                <label key={index}>country: {c.country}</label>
              </div>
            )
          })
        }
        </div>

        <div>
        {
          allOrgs.map((o: Organization, index: number) => {
            return (
              <div>
                <label key={index}>org: {o.orgName}</label>
              </div>
            )
          })
        }
        </div>
      </main>
    </>
  )
}
