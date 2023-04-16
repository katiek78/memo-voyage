import Link from 'next/link'
import { useRouter } from 'next/router'
import dbConnect from '../lib/dbConnect'
import Journey from '../models/Journey'
import defaultCity from "../public/assets/default.jpg";

const Index = ({ journeys }) => {
  const router = useRouter();

  return(
  <>
    {/* Create a card for each journey */}
    {journeys.map((journey) => (
      <div key={journey._id}>
        <div onClick={() => router.push(`/${journey._id}`)} className="card">
          {journey.image_url !== '' && <img src={journey.image_url} alt={`picture linked to ${journey.name} journey`} /> }
          {(!journey.image_url || journey.image_url === '') && <img src={defaultCity.src} alt="AI-generated colourful picture of cityscape" /> }
          <h5 className="pet-name">{journey.name}</h5>
          <div className="main-content">
            <p className="pet-name">{journey.name}</p>
           <p className="owner">{journey.points?.length} journey points</p>
           
            </div>
            
            {/* <div className="btn-container">
              <Link href="/[id]/edit" as={`/${journey._id}/edit`} legacyBehavior>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${journey._id}`} legacyBehavior>
                <button className="btn view">View</button>
              </Link>
            </div> */}          
        </div>
      </div>
    ))}
  </>
  )
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Journey.find({})
  const journeys = result.map((doc) => {
    //const journey = doc.toObject()
    const journey = JSON.parse(JSON.stringify(doc));
    journey._id = journey._id.toString()
    return journey
  })

  return { props: { journeys: journeys } }
}

export default Index
