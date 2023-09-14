"use client"
import React,{useState,useEffect, ChangeEvent} from 'react'

interface Props {
    curDuration: number,
    handleMaxChange:(e: ChangeEvent<HTMLInputElement>)=>void
}

function AudioTimeBar({curDuration,handleMaxChange}:Props) {

    // const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const curTime = + e.target.value
    //     setMaxValue(curTime)
    // }


    return (
        <div className={`relative w-[calc(100%_-_12px)] h-1 mb-2 flex item-center`}>
            <div className='absolute w-[calc(100%_+_16px)]'>
                <input
                    className="absolute h-full pointer-events-none appearance-none opacity-0 z-[3] w-full"
                    type="range"
                    value={curDuration.toString()}
                    min={0}
                    max={100}
                    step={1}
                    onChange={(e) => handleMaxChange(e)}
                />
            </div>

            <div className="control-wrapper absolute w-full ">
                <div className="absolute control w-3 h-3 rounded-full  bg-black/50 top-1/2 z-[2] translate-y-[-50%]" style={{ left: `${curDuration}%` }} />
                <div className="rail absolute bg-black/25 w-[calc(100%_+_12px)] h-2 top-1/2 translate-y-[-50%] rounded-lg" >
                    <div
                        className="inner-rail absolute h-2  bg-black/25 rounded-lg"
                        style={{ right: `${100 - curDuration}%`,left: `${0}%` }}
                    />
                </div>
            </div>

        </div >
    )
}

export default  AudioTimeBar