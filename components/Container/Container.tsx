import React from 'react'

interface Props {
  children: React.ReactNode,
  roundPosition?: "bottom"| "full" | "top"
}

function Container({ children, roundPosition = "full" }: Props) {

  const rounded = (roundPosition:string) => {
    switch (roundPosition) {
      case "top":
        return "rounded-t-3xl"
      case "bottom":
        return "rounded-b-3xl"
      default:
        return "rounded-3xl"
    }
  }


  return (
    <div className={` container w-full ${rounded(roundPosition)} p-3  mb-3`}>
      {children}
    </div>
  )
}

export default Container