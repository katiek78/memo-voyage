import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Journey from '../models/Journey'

const Index = ({ journeys }) => (
  <>
    {/* Create a card for each journey */}
    {journeys.map((journey) => (
      <div key={journey._id}>
        <div className="card">
          {/* <img src={pet.image_url} /> */}
          <h5 className="pet-name">{journey.name}</h5>
          <div className="main-content">
            <p className="pet-name">{journey.name}</p>
            {/* <p className="owner">Owner: {pet.owner_name}</p>

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
              </ul> */}
            {/* </div> */}

            <div className="btn-container">
              <Link href="/[id]/edit" as={`/${journey._id}/edit`} legacyBehavior>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${journey._id}`} legacyBehavior>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Journey.find({})
  const journeys = result.map((doc) => {
    const journey = doc.toObject()
    journey._id = journey._id.toString()
    return journey
  })

  return { props: { journeys: journeys } }
}

export default Index
