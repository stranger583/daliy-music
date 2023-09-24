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
        <p className={`grow ${descStyle}`}>{desc??"今天沒有推薦，是預設歌曲呦！！"}</p>
        <div className={`${arrowIconStyle} cursor-pointer`} onClick={()=>handleOpenDesc()}><DownArrowIcon/></div>
    </div>
  )
}

export default Message