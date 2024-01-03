import CircularProgressBar from '../animated/CircularProgressBar'
import { TitleRelease } from './TitleRelease'
import { Plus, Youtube } from 'lucide-react'
import { TitleData } from './types/TitleData'
import { ReleaseData } from './types/ReleaseData'

type InfoProps = {
  title: TitleData
  release: ReleaseData
}

export const TitleInfo: React.FC<InfoProps> = ({ title, release }) => {
  const handleGetReleaseYear = (element: TitleData) => {
    const date = element.first_air_date || element.release_date

    if (!date) return ''
    const year = date.split('-')[0]
    return `(${year})`
  }

  const handleHoursAndMinutes = (minutes: number) => {
    const hh = Math.floor(minutes / 60)
    const mm = minutes % 60
    return `${hh}h ${mm}m`
  }

  const handleVoteAverageToPercent = (vote: number) => {
    if (!vote) return 0
    const fixedVote = parseFloat(vote.toFixed(2))
    return Math.round(fixedVote * 10)
  }

  const handleSetTitle = (element: TitleData) => {
    if (element.title) return element.title
    if (element.name) return element.name
    if (element.original_title) return element.original_title
    else return 'Movie'
  }

  return (
    <div className='flex flex-col justify-center px-8 gap-4'>
      <div>
        <h1 className='text-[calc(.7em+3vw)] md:text-4xl text-white font-bold'>
          {handleSetTitle(title)} <span>{handleGetReleaseYear(title)}</span>
        </h1>

        <ul className='flex flex-wrap gap-2 text-white'>
          {title.genres.map((i, key) => (
            <li key={key}>{i.name}</li>
          ))}
          <li title='DD/MM/YYYY'>{handleHoursAndMinutes(title.runtime)}</li>
        </ul>
      </div>

      <div className='flex gap-2 items-center'>
        <div>
          <CircularProgressBar progressPercentage={handleVoteAverageToPercent(title.vote_average)} />
        </div>
        <button className='flex items-center justify-center rounded-[50%] px-1 py-2 text-white bg-[#032541]'>
          <Plus className='h-4' />
        </button>
        <button className='flex items-center justify-center rounded-[50%] px-1 py-2 text-white bg-[#032541]'>
          <Youtube className='h-4' />
        </button>
      </div>

      <p className='font-normal text-[1.1rem] italic opacity-70 text-white'>{title.tagline}</p>
      <p className='text-white'>{title.overview}</p>
      {release && <TitleRelease release={release} />}
    </div>
  )
}