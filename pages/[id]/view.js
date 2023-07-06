import { useRouter } from 'next/router'
import useSWR from 'swr'
import Link from 'next/link'
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

  const mql = window.matchMedia('(max-width: 600px)');
  const mobileView = mql.matches;
  const mql2 = window.matchMedia('(min-width: 600px)');
  const midView = mql2.matches;
  const mql3 = window.matchMedia('(min-width: 1000px)');
  const largeView = mql3.matches;

  let width = 0, height = 0;
    if (mobileView) {
        width = 300, height = 200;
    } else if (largeView) {
        width = 900, height = 500;
    } else {
        width = 400, height = 300;
    }
    

  return <>
    <div className="title-and-content">
        <div className="title">Journey: {thisJourney.name}</div>
        <div className="journey-btn-container">       
                  {sequenceNo > 0 ?
                        <Link href="/[id]/view" as={`/${thisJourney.points[sequenceNo - 1]._id}/view`} legacyBehavior>
                        <button className="btn previous">Previous</button>
                        </Link>
                  :    <button className="btn previous btn-disabled">Previous</button>
                  }
                  {sequenceNo < thisJourney.points.length - 1 ?
                        <Link href="/[id]/view" as={`/${thisJourney.points[sequenceNo + 1]._id}/view`} legacyBehavior>
                        <button className="btn next">Next</button>
                        </Link>
                  :    <button className="btn next btn-disabled">Next</button>
                  }

                  <Link href="/[id]" as={`/${thisJourney._id}`} legacyBehavior>
                    <button className="btn">Back to journey</button>
                 </Link>
         
                    </div>
        <div className='card-container'>
          <div className="point-card point-card-large">
              <div className="card-content">
                      <p className="point-name">{sequenceNo + 1}. {point.name}</p>
                      <p className="memo-item">{point.memoItem}</p>
                      <EmbedStreetView width={width} height={height} location={point.location} heading={point.heading || 90} pitch={point.pitch || 0} fov={point.fov || 100} />
                      
              </div>
          </div>
        </div>
     </div>
    </>
  
   
}

export default ViewPoint
