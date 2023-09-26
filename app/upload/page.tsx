'use client'
import React, { useState } from 'react'
import LightBox from '@/components/Lightbox.tsx/LightBox'


function page() {
    

    return (
        <div>
            <LightBox
            handleCloseLightBox={()=>{}}
            IsOpenLightBox={true}
            lightBoxSituation={""}
            />
        </div>
    )
}

export default page