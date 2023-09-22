"use client"
import React, { useState, ChangeEvent } from 'react'
import InputText from '../InputText/InputText'

interface Props {
    handleCloseLightBox: () => void;
    IsOpenLightBox: boolean
    lightBoxSituation: string;
}

interface I_MessageValue {
    user: string;
    desc: string;
}

interface I_RecommendValue {
    user: string;
    song: string;
    artist: string;
    desc: string;
}

function LightBox({ handleCloseLightBox, IsOpenLightBox, lightBoxSituation }: Props) {

    const [messageValue, setMessageValue] = useState({
        user: "",
        desc: ""
    })

    const [recommendValue, setRecommendValue] = useState({
        user: "",
        song: "",
        artist: "",
        desc: ""
    })

    const dayToString = () => {
        const today = new Date()
        const year = today.getFullYear()
        const month = (today.getMonth() + 1).toString().padStart(2, "0")
        const date = today.getDate().toString().padStart(2, "0")
        return `${year}${month}${date}`
    }


    const handleMessageValue = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        setMessageValue({
            ...messageValue,
            [key]: e.target.value
        })
    }

    const handleRecommendValue = (e: ChangeEvent<HTMLInputElement>, key: string) => {
        setRecommendValue({
            ...recommendValue,
            [key]: e.target.value
        })
    }

    const handleSubmitMessageData = async (messageValue: I_MessageValue) => {
        const MessageResponse = await fetch('http://localhost:8000/message/post', {
            method: 'POST',
            body: JSON.stringify({
                id: 1,
                main: [{
                    user: messageValue.user,
                    desc: messageValue.desc,
                }],
                date: dayToString()
            }),
            headers: { "Content-Type": "application/json" }
        })
        const data = await MessageResponse.json()
        handleCloseLightBox()
        setMessageValue({
            user: "",
            desc: ""
        })
    }

    const handleSubmitRecommend = async (recommendValue: I_RecommendValue) => {
        const RecommendResponse = await fetch('http://localhost:8000/recommend/post', {
            method: 'POST',
            body: JSON.stringify({
                id: 1,
                main: [{
                    user: recommendValue.user,
                    artist: recommendValue.artist,
                    song: recommendValue.song,
                    desc: recommendValue.desc,
                }],
                date: dayToString()
            }),
            headers: { "Content-Type": "application/json" }
        })
        const data = await RecommendResponse.json()
        handleCloseLightBox()
        setRecommendValue({
            user: "",
            song: "",
            artist: "",
            desc: ""
        })
    }

    if (IsOpenLightBox === false) return <></>

    const ShareComponent =
        <div className={`bg2 bg-black/25 fixed z-30 top-0 right-0 overflow-hidden h-screen w-screen`}>
            <div className={`glass w-[300px] rounded-lg max-h-max fixed top-0 left-0 right-0 bottom-0 m-auto`}>
                <div className='text-right pt-3 px-3 flex justify-between align-middle font-semibold'>
                    Recommend
                    <button onClick={() => handleCloseLightBox()}>x</button>
                </div>
                <div className='p-6 flex flex-col justify-center gap-2'>
                    <InputText placeholder='user' value={recommendValue.user} onChange={e => handleRecommendValue(e, "user")} />
                    <InputText placeholder='song' value={recommendValue.song} onChange={e => handleRecommendValue(e, "song")} />
                    <InputText placeholder='artist' value={recommendValue.artist} onChange={e => handleRecommendValue(e, "artist")} />
                    <InputText placeholder='desc' value={recommendValue.desc} onChange={e => handleRecommendValue(e, "desc")} />
                </div>
                <div className=' text-center p-2 border-t border-dark-gray font-semibold'><button onClick={() => handleSubmitRecommend(recommendValue)}>DONE</button></div>
            </div>
        </div>

    const MessageComponent =
        <div className={`bg2 bg-black/25 fixed z-30 top-0 right-0 overflow-hidden h-screen w-screen`}>
            <div className={`glass w-[300px] rounded-lg max-h-max fixed top-0 left-0 right-0 bottom-0 m-auto`}>
                <div className='text-right pt-3 px-3 flex justify-between align-middle font-semibold'>
                    Share
                    <button onClick={() => handleCloseLightBox()}>x</button>
                </div>
                <div className='p-6 flex flex-col justify-center gap-2'>
                    <InputText placeholder='user' value={messageValue.user} onChange={e => handleMessageValue(e, "user")} />
                    <InputText placeholder='desc' value={messageValue.desc} onChange={e => handleMessageValue(e, "desc")} />
                </div>
                <div className=' text-center p-2 border-t border-dark-gray font-semibold'><button onClick={() => handleSubmitMessageData(messageValue)}>DONE</button></div>
            </div>
        </div>

    return (
        lightBoxSituation === "share" ? ShareComponent : MessageComponent
    )
}

export default LightBox