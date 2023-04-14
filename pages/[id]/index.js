import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Journey from '../../models/Journey'

/* Allows you to view pet card info and delete pet card*/
const JourneyPage = ({ journey }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const journeyID = router.query.id

    try {
      await fetch(`/api/journeys/${journeyID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the journey.')
    }
  }

  return (
    <div key={journey._id}>
      <div className="card">
        {/* <img src={journey.image_url} /> */}
        <h5 className="pet-name">{journey.name}</h5>
        <div className="main-content">
          <p className="pet-name">{journey.name}</p>
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

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${journey._id}/edit`} legacyBehavior>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const journey = await Journey.findById(params.id).lean()
  journey._id = journey._id.toString()

  return { props: { journey } }
}

export default JourneyPage
