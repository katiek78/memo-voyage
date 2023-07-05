import { useRouter } from 'next/router'
import useSWR from 'swr'
import EmbedStreetView from '../../components/EmbedStreetView'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const ViewPoint = () => {
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
  //const point = thisJourney.points.filter(point => point._id === id)[0];

  function getPointData(points, id) {
    for (let i = 0; i < points.length; i++) {
      if (points[i]._id === id) {
        return { point: points[i], sequenceNo: i };
      }
    }
    return null; 
  }

  const pointData = getPointData(thisJourney.points, id)
  const { point, sequenceNo } = pointData;
  

  return <>
    <div className="title-and-content">
        <div className="title">Journey: {thisJourney.name}</div>
        <div className="point-card point-card-large">
            <div className="card-content">
                    <p className="point-name">{sequenceNo + 1}. {point.name}</p>
                    <EmbedStreetView width={1150} height={600} location={point.location} heading={point.heading || 90} pitch={point.pitch || 0} fov={point.fov || 100} />
             </div>
        </div>
     </div>
    </>
    {/* <div className="point-card point-card-large">
        <div className="card-content">
            <p className="point-name">{point.name}</p>
            <EmbedStreetView width={300} height={200} location={point.location} heading={point.heading || 90} pitch={point.pitch || 0} fov={point.fov || 100} />
        </div>
    </div> */}
   
}

export default ViewPoint
