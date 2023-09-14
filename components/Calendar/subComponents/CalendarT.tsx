"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'


interface Props {
    handleChangeLastPositionDay: (date: Date) => void
    IsOpenCalendar: boolean
    dateParamsObj: { [key: string]: number }
}

function CalendarT({ handleChangeLastPositionDay, IsOpenCalendar, dateParamsObj }: Props) {
    const { yy, mm, dd } = dateParamsObj
    const router = useRouter()
    const handleGetDate = (year: string, month: string, date: string) => {
        router.push(`/?year=${year}&month=${(parseInt(month) + 1).toString().padStart(2, "0")}&date=${date.padStart(2, "0")}`)
    }

    const [date, setDate] = useState(new Date(yy, mm, dd));
    let weekdays = "Su,Mo,Tu,We,Th,Fr,Sa".split(",");
    let months = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");

    const month = date.getMonth();
    const year = date.getFullYear();
    const day = new Date(year, month, 1).getDay(); // 星期
    const totalDays = new Date(year, month, 0).getDate(); //總天數
    const chooseDay = date.getDate(); //����的日期

    const fullDay = Array(totalDays).fill("").map((day, i) => i + 1)

    for (let i = 0; i < day; i++) {
        fullDay.unshift(32 + i);
    }

    const handleChooseDate = (curDate: number) => {
        setDate(new Date(year, month, curDate));

    }

    const handleChooseMonth = (count: number) => {
        setDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + count);
            return newDate;
        });
    }

    useEffect(() => {
        handleChangeLastPositionDay(date)
        handleGetDate(date.getFullYear().toString(), date.getMonth().toString(), date.getDate().toString())
    }, [date])




    return (
        <div className={`glass rounded-lg p-4 mx-3 text-center absolute z-20 top-[200px] ${!IsOpenCalendar && "hidden"}`} >
            <div className='flex h-10 items-center justify-between mb-3'>
                <div onClick={() => handleChooseMonth(-1)}>{"<"}</div>
                {`${months[month]} ${year}`}
                <div onClick={() => handleChooseMonth(1)}>{">"}</div>
            </div>

            <div>
                <div className='flex w-full mb-3'>
                    {weekdays.map((date) => (
                        <div key={date} className='w-[calc(100%_/_7)]'>{date}</div>
                    ))}
                </div>
                <div className='flex flex-wrap gap-y-3'>
                    {
                        fullDay.map((day) => (
                            <div
                                key={day}
                                onClick={() => handleChooseDate(day)}
                                className={`w-[calc(100%_/_7)] ${chooseDay === day ? "bg2 rounded-full text-white" : ""}`}
                            >
                                {day < 31 ? day : ""}
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default CalendarT