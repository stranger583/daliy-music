'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  date: string,
  week: string,
  month: string,
  year: string
}


function DayList({ year,date, week, month }: Props) {

  const router = useRouter()
  const searchParams = useSearchParams()

  let  dateParams = searchParams.get("date")
  if(!dateParams) dateParams = new Date().getDate().toString()
  
  const isSelect = date.padStart(2,"0") === dateParams ? "bg2 text-white" : ""

  const handleGetDate = (year:string,month: string, date: string) => {
    router.push(`/?year=${year}&month=${(parseInt(month)+1).toString().padStart(2,"0")}&date=${date.padStart(2,"0")}`)
  }

  return (
    <div className='pb-4 cursor-pointer'>
      <div className='pb-3'>{week}</div>
      <div className={`font-semibold  w-8 h-8 rounded-full grid place-items-center ${isSelect}`} onClick={() => handleGetDate(year,month, date)}>{date}</div>
    </div>
  )
}

export default DayList