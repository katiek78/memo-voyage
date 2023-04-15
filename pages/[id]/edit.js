import { useRouter } from 'next/router'
import useSWR from 'swr'
import JourneyForm from '../../components/JourneyForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditJourney = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data: journey,
    error,
    isLoading,
  } = useSWR(id ? `/api/journeys/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (isLoading) return <p>Loading...</p>
  if (!journey) return null

  const journeyForm = {
    name: journey.name,    
    image_url: journey.image_url
  }

  return <JourneyForm formId="edit-journey-form" journeyForm={journeyForm} forNewJourney={false} />
}

export default EditJourney
