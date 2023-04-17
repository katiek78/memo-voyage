import { useRouter } from 'next/router'
import useSWR from 'swr'
import PointForm from '../../components/PointForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditPoint = () => {
  const router = useRouter()
  const { id } = router.query
  const {
    data: journey,
    error,
    isLoading,
  } = useSWR(id ? `/api/points/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (isLoading) return <p>Loading...</p>
  if (!journey) return null  
  const thisJourney = Array.isArray(journey) ? journey[0] : journey;
  const point = thisJourney.points.filter(point => point._id === id)[0];  

  const pointForm = {
    name: point.name,    
    location: point.location,
    heading: point.heading,
    pitch: point.pitch,
    fov: point.fov
  }

  return <PointForm formId="edit-point-form" pointForm={pointForm} forNewPoint={false} />
}

export default EditPoint
