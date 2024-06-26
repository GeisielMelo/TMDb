import Navigation from '../../components/Header/Navigation'
import Slider from '../../components/Carousel/Slider'
import Footer from '../../components/Footer/Footer'
import { useLanguages } from '../../hooks/useLanguages'
import Showcase from '../../components/Showcase/Showcase'

const Home: React.FC = () => {
  const { locale } = useLanguages()
  const url = 'https://api.themoviedb.org/3/'
  const trending = `${url}trending/all/week?language=${locale}`
  const movies = `${url}trending/movie/day?language=${locale}`
  const tvShow = `${url}trending/tv/day?language=${locale}`

  return (
    <>
      <Navigation />
      
      <main className='min-h-screen flex flex-col item-center justify-center gap-8'>
        <Showcase url={trending} />
        <Slider sectionName='trending' category='Trending' url={trending} />
        <Slider sectionName='movies' category='Movies' url={movies} />
        <Slider sectionName='tv-show' category='Tv Show' url={tvShow} />
      </main>
      <Footer />
    </>
  )
}

export default Home
