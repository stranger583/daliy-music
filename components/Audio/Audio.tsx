"use client"
import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import Img from "../../public/NF.jpg"
import { LikeIcon, BackIcon, FrontIcon, PlayIcon, StopIcon, LikeStrokeIcon } from '../Icons/Icons'
import AudioTimeBar from './subComponents/AudioTimeBar'

function Audio({ musicObj }: any) {
    const audioRef = useRef<HTMLAudioElement>(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [curTime, setCurTime] = useState("")
    // const [isLike, setIsLike] = useState(false)


    const handleToggle = () => {
        isPlaying ? audioRef.current!.pause() : audioRef.current!.play();
        setIsPlaying(prev => !prev)
    }

    const handleCurrentTime = (time: number) => {
        audioRef.current!.currentTime += time;
    }
    const duration = audioRef.current!?.duration

    const calcTime = (duration: number | undefined) => {
        if (!duration) return "-"
        const minute = Math.floor(duration / 60);
        const rest_seconds = Math.floor(duration - minute * 60);
        return `${minute.toString().padStart(2, '0')}:${rest_seconds.toString().padStart(2, '0')}`
    }

    const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const curTimePercent = + e.target.value
        audioRef.current!.currentTime = curTimePercent / 100 * audioRef.current!.duration
        const curTimeValue = audioRef.current!.currentTime
        setCurTime(curTimeValue.toString())

    }


    useEffect(() => {
        if (!audioRef.current) return;
        const handleTimeUpdate = () => {
            const curSongTime = audioRef.current!?.currentTime
            setCurTime(curSongTime?.toString());
        };

        audioRef.current!.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audioRef.current!.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    useEffect(() => {
        setIsPlaying(false)
        setCurTime("")

    }, [musicObj])

    // console.log(musicObj)
    // const isLikeStyle = !isLike ? "islikeStyle" : ""


    return (
        <>
            <div className='p-4'>
                <div className='flex items-center mb-4'>
                    <img src={musicObj?.imgUrl ?? Img.src} alt={musicObj?.imgUrl ?? Img.src} className='w-[56px] h-[56px] object-cover rounded-lg mr-3 ' />
                    <div className=''>
                        <p className='text-[13px] font-semibold mb-1'>{musicObj?.name ?? 'Hope'}</p>
                        <p className='text-xs font-semibold text-dark-gray'>{musicObj?.artist ?? 'NF'}</p>
                    </div>
                    {/* <button className={`${isLikeStyle}`} onClick={() => setIsLike(prev => !prev)}><LikeIcon /></button> */}
                </div>
                <div className='mb-2'>
                    <AudioTimeBar
                        handleMaxChange={handleMaxChange}
                        curDuration={curTime ? +curTime / duration * 100 : 0}
                    ></AudioTimeBar>
                    <div className='flex justify-between'>
                        <div className='text-xs'>{calcTime(+curTime)}</div>
                        <div className='text-xs'>{calcTime(duration)}</div>
                    </div>
                </div>
                <div className='flex items-center justify-between w-[150px] mx-auto '>
                    <button onClick={() => handleCurrentTime(-5)}><BackIcon /></button>
                    <button onClick={() => handleToggle()} className='h-6'>{isPlaying ? <StopIcon /> : <PlayIcon />}</button>
                    <button onClick={() => handleCurrentTime(5)}><FrontIcon /></button>
                </div>
            </div>
            <audio
                ref={audioRef}
                onEnded={() => setIsPlaying(false)}
                controls
                className='absolute top-[-99999px] visible'
                src={musicObj?.url ?? "https://sweethiphop.com/music/uploads/2023/07/NF_-_HOPE-sweethiphop.com.mp3?_=1"}>
            </audio>
        </>
    )
}

export default Audio