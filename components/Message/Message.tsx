"use client"
import React,{useState} from 'react'
import { DownArrowIcon } from '../Icons/Icons'

interface Props {
  desc?:string
}

function Message({desc}:Props) {
  const [isOpenDesc, setIsOpenDesc] = useState(false)
  const handleOpenDesc = () => setIsOpenDesc(prev=>!prev)
  const descStyle = isOpenDesc? "" : "line-clamp-2"
  const arrowIconStyle = isOpenDesc? "rotate-180" : ""
  return (
    <div className='flex items-center text-sm gap-3'>
        <div>✨</div>
        <p className={`grow ${descStyle}`}>{desc??"沒有推薦文案沒有推薦文案沒有推薦文案沒有推薦文案沒有推薦文案沒有推薦文案沒有推薦文案沒有推薦文案"}</p>
        <div className={`${arrowIconStyle}`} onClick={()=>handleOpenDesc()}><DownArrowIcon/></div>
    </div>
  )
}

export default Message