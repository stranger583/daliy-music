import Calendar from "@/components/Calendar/Calendar";
import Container from "@/components/Container/Container";
import Audio from "@/components/Audio/Audio";
import Message from "@/components/Message/Message";
// import CalendarT from "@/components/Calendar/subComponents/CalendarT";

interface Props {
  searchParams:{[key:string]: string|string[]|undefined}
}

async function getData({searchParams}:Props) {
  const today = new Date();
  const month = searchParams["month"]?parseInt(searchParams["month"] as string)?.toString().padStart(2,"0"):(today.getMonth() + 1).toString().padStart(2,"0")
  const date =  (searchParams["date"] as string)?.padStart(2,"0")??today.getDate().toString().padStart(2,"0")
  const year =  (searchParams["year"]as string)?.padStart(2,"0")?? today.getFullYear().toString().padStart(2,"0")

  const url = `http://localhost:8000/music/get/${year}${month}${date}`;
    const response = await fetch(url)
    const data = await response.json()
    return data
}


export default async function Home({searchParams}:Props) {
  
  const musicObj = await getData({searchParams})
  
  return (
<main className="flex min-h-screen flex-col items-center  max-lg:px-3  ">
        <Calendar/>
      <Container>
        <Message desc={musicObj?.desc} />
      </Container>
      <Container>
        <Audio musicObj={musicObj}/>
      </Container>
    </main>
  )
}
