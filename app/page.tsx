import Calendar from "@/components/Calendar/Calendar";
import Container from "@/components/Container/Container";
import Audio from "@/components/Audio/Audio";
import Message from "@/components/Message/Message";
import Weather from "@/components/Weather/Weather";
import Recommend from "@/components/Recommend/Recommend";



// import CalendarT from "@/components/Calendar/subComponents/CalendarT";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getData({ searchParams }: Props) {
  const today = new Date();
  const t_month = (today.getMonth() + 1).toString().padStart(2, "0")
  const t_day = today.getDate().toString().padStart(2, "0")
  const t_year = today.getFullYear().toString().padStart(2, "0")

  const month = searchParams["month"] ? parseInt(searchParams["month"] as string)?.toString().padStart(2, "0") : t_month
  const date = (searchParams["date"] as string)?.padStart(2, "0") ?? t_day
  const year = (searchParams["year"] as string)?.padStart(2, "0") ?? t_year
  const urlDate = new Date( parseInt(year) , parseInt(month) - 1 ,parseInt(date))

  const isOverDate = urlDate.getTime() > new Date().getTime()
  const url = isOverDate ? 
    `https://daily-music-api-h0qs.onrender.com/music/get/${year}${month}${date}`:
    `https://daily-music-api-h0qs.onrender.com/music/get/${t_year}${t_month}${t_day}`
    ;
  const response = await fetch(url)
  const data = await response.json()
  return data
}


export default async function Home({ searchParams }: Props) {

  const musicObj = await getData({ searchParams })

  return (
    <main className="flex min-h-screen flex-col items-center  max-lg:px-3  ">
      <Calendar />
      {/* <Container>
        <Weather />
      </Container> */}
      <Container>
        <Message desc={musicObj?.desc} />
      </Container>
      {/* <Container>
        <Recommend />
      </Container> */}
      <Container>
        <Audio musicObj={musicObj} />
      </Container>
    </main>
  )
}
