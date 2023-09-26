'use client'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { DownArrowIcon, MessageIcon, ShareIcon } from '../Icons/Icons'
import DayList from './subComponents/DayList'
import LightBox from '../Lightbox.tsx/LightBox'
import Container from '../Container/Container'
import CalendarT from "@/components/Calendar/subComponents/CalendarT";


interface I_CurDateObj {
    year: number
    month: number
    week: string
    date: number
}



function Calendar({ }) {

    const searchParams = useSearchParams()
    const yearParams = searchParams.get("year") ?? new Date().getFullYear().toString()
    const monthParams = searchParams.get("month") ?? new Date().getMonth().toString()
    const dateParams = searchParams.get("date") ?? new Date().getDate().toString()
    const dateParamsObj = {
        yy: +yearParams,
        mm: searchParams.get("month")? +monthParams-1:+monthParams,
        dd: +dateParams
    }
    const [lightBoxSituation, setLightBoxSituation] = useState("share")
    const [IsOpenLightBox, setIsOpenLightBox] = useState(false);
    const [IsOpenCalendar, setIsOpenCalendar] = useState(false);
    const [lastPositionDay, setLastPositionDay] = useState(new Date(Number(yearParams),Number(monthParams)-1,Number(dateParams)))

    const today = lastPositionDay
    let months = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");
    let weekdays = "Su,Mo,Tu,We,Th,Fr,Sa".split(",");
    const curDateObj = (dd: Date) => ({ year: dd.getFullYear(), month: dd.getMonth(), week: weekdays[dd.getDay()], date: dd.getDate() })

    const weeksDate = () => {
        let yesterday = new Date(today)
        const WeekDateArray: I_CurDateObj[] = []
        for (let index = 0; index < 7; index++) {
            const newDay = new Date(yesterday)
            WeekDateArray.unshift(curDateObj(newDay))
            yesterday.setDate(yesterday.getDate() - 1)
        }
        return WeekDateArray
    }

    const curWeek = weeksDate()


    const handleCloseLightBox = () => setIsOpenLightBox(false)
    const handleToggleCalendar = () => setIsOpenCalendar(prev => !prev)
    const handleChangeLastPositionDay = (date: Date) => setLastPositionDay(date)
    const handleOpenLightBox = (text:string) => {
        setLightBoxSituation(text)
        setIsOpenLightBox(true)
    }



    return (
        <>
            <LightBox handleCloseLightBox={handleCloseLightBox} IsOpenLightBox={IsOpenLightBox} lightBoxSituation={lightBoxSituation}/>
            { <CalendarT handleChangeLastPositionDay={handleChangeLastPositionDay} IsOpenCalendar={IsOpenCalendar} dateParamsObj={dateParamsObj} />}

            <Container roundPosition={"bottom"}>
                <div className='background-blur text-black '>
                    <div className='flex justify-between pt-10'>
                        <h2 className=' flex gap-2 font-semibold text-xl items-center' onClick={handleToggleCalendar}>
                        {/* <h2 className=' flex gap-2 font-semibold text-xl items-center' > */}

                            {months[+monthParams - 1]}
                            <DownArrowIcon />
                        </h2>
                        <div className='flex gap-2 items-center'>
                            <button onClick={() => handleOpenLightBox("message")}><MessageIcon /></button>
                            <button onClick={() => handleOpenLightBox("share")}><ShareIcon /></button>
                        </div>
                    </div>
                    <div className='flex justify-between text-center pt-6 text-sm max-w-[320px] m-auto'>
                        {curWeek.map((dateItem, i) => (
                            <DayList key={dateItem.date} year={dateItem.year.toString()} month={dateItem.month.toString()} week={dateItem.week} date={dateItem.date.toString()} />
                        ))}
                    </div>
                </div>
            </Container >
        </>
    )
}

export default Calendar