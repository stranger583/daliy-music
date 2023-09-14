"use client"
import React, { useState } from 'react'
import InputText from '../InputText/InputText'

interface Props {
    handleCloseLightBox: () => void;
    IsOpenLightBox: boolean
    lightBoxSituation: string;
}

function LightBox({ handleCloseLightBox, IsOpenLightBox, lightBoxSituation }: Props) {

    if (IsOpenLightBox === false) return <></>

    const ShareComponent =
        <div className={`bg2 bg-black/25 fixed z-30 top-0 right-0 overflow-hidden h-screen w-screen`}>
            <div className={`glass w-[300px] rounded-lg max-h-max fixed top-0 left-0 right-0 bottom-0 m-auto`}>
                <div className='text-right pt-3 px-3 flex justify-between align-middle font-semibold'>
                    Recommend
                    <button onClick={() => handleCloseLightBox()}>x</button>
                </div>
                <div className='p-6 flex flex-col justify-center gap-2'>
                    <InputText placeholder='user' />
                    <InputText placeholder='song' />
                    <InputText placeholder='artist' />
                    <InputText placeholder='desc' />
                </div>
                <div className=' text-center p-2 border-t border-dark-gray font-semibold'><button>DONE</button></div>
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
                    <InputText placeholder='user' />
                    <InputText placeholder='desc' />
                </div>
                <div className=' text-center p-2 border-t border-dark-gray font-semibold'><button>DONE</button></div>
            </div>
        </div>

    return (
        lightBoxSituation === "share"? ShareComponent : MessageComponent
    )
}

export default LightBox