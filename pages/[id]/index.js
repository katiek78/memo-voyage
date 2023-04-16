import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Journey from '../../models/Journey'
import EmbedStreetView from '../../components/EmbedStreetView'
import { refreshData } from '../../lib/refreshData'

/* Allows you to view journey info, points and delete journey*/
const JourneyPage = ({ journey }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const journeyID = router.query.id

    try {
      await fetch(`/api/journeys/${journeyID}`, {
        method: 'Delete',
      })
      router.push(`/`)      
    } catch (error) {
      setMessage('Failed to delete the journey.')
    }
  }

  const handleDeletePoint = async (pointID, e) => {
    
    try {
      await fetch(`/api/points/${pointID}`, {
        method: 'Delete',
      })
      //router.push(`/${journeyID}`)
      refreshData(router);
    } catch (error) {
      setMessage('Failed to delete the point.')
    }
  }


  return (
    <div key={journey._id}>
      <h2>{journey.name}</h2>
      {(!journey.points || journey.points.length === 0) &&
        <h3>Your journey doesn't have any points yet.</h3>
      }
      {journey.points?.map(point => 
      <div className="point-card">
        {/* <img src={journey.image_url} /> */}
        {/* <h5 className="pet-name">{point.name}</h5> */}
        <div className="card-content">
          <p className="pet-name">{point.name}</p>
          <EmbedStreetView width={300} height={200} location={point.location} />
          {/* <p className="owner">Owner: {pet.owner_name}</p> */}

          {/* Extra Pet Info: Likes and Dislikes */}
          {/* <div className="likes info">
            <p className="label">Likes</p>
            <ul>
              {pet.likes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
            <ul>
              {pet.dislikes.map((data, index) => (
                <li key={index}>{data} </li>
              ))}
            </ul>
          </div> */}

          <div className="point-btn-container">
            <Link href="/[id]/editPoint" as={`/${point._id}/editPoint`} legacyBehavior>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={() => handleDeletePoint(point._id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
      )}
      
      <Link href="/[id]/new" as={`/${journey._id}/new`} legacyBehavior>
      <button className="btn add">Add a point</button>
      </Link>
      <Link href="/[id]/edit" as={`/${journey._id}/edit`} legacyBehavior>
      <button className="btn edit">Edit journey</button>
      </Link>
      <button className="btn delete" onClick={handleDelete}>
              Delete journey
            </button>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  let journey = await Journey.findById(params.id).lean()
  journey = JSON.parse(JSON.stringify(journey))
  journey._id = journey._id.toString()
  return { props: { journey } }
}

export default JourneyPage
