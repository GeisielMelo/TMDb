import { useLocation } from 'react-router-dom'
import { useLanguages } from '../../hooks/useLanguages'
import { useInfiniteScroll as InfiniteScroll } from '../../hooks/useInfiniteScroll'
import { useSpreadableSearch } from '../../hooks/useSpreadableSearch'
import { Card } from '../../components/Card/Card'
import { Spinner } from '../../components/animated/Spinner'
import Navigation from '../../components/Header/Navigation'
import Footer from '../../components/Footer/Footer'
import { filterMovieDataArr } from '../../utils/filterData'

const Search: React.FC = () => {
  const { locale } = useLanguages()
  const { search } = useLocation()

  const queryParams = new URLSearchParams(search)
  const query: string | null = queryParams.get('q')
  const type: string | null = queryParams.get('type')

  const { page, maxPage, data, error, loading, loadingMore, setPage } = useSpreadableSearch(query, type, locale)

  if (error) return null

  return (
    <>
      <Navigation />
      <section className='flex flex-col min-h-screen items-center justify-center px-2 md:px-8 pt-4 pb-8'>
        <h1 className='max-w-7xl w-full mb-4'>Search: {query}.</h1>
        <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-7xl w-full'>
          {loading ? (
            <>
              {[...Array(12)].map((_, key) => (
                <div key={key} className='max-w-xl w-full h-96 rounded animate-pulse bg-gray-500' />
              ))}
            </>
          ) : (
            <>
              {data && (
                <>
                  {filterMovieDataArr(data).map((element, key) => (
                    <Card
                      key={key}
                      id={element.id}
                      src={element.src}
                      title={element.title}
                      vote={element.vote}
                      media={element.media}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </div>

        {loadingMore && (<div className='my-8'><Spinner /></div>)}
        {page < maxPage && data && !loading && !loadingMore && <InfiniteScroll fetchMore={() => setPage(page + 1)} />}
      </section>
      <Footer />
    </>
  )
}

export default Search
