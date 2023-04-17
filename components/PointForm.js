import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import LocationExplanation from './LocationExplanation'
import EmbedStreetView from './EmbedStreetView'

const PointForm = ({ formId, pointForm, forNewPoint = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: pointForm.name,  
    location: pointForm.location,
    heading: pointForm.heading || 90,
    pitch: pointForm.pitch || 0,
    fov: pointForm.fov || 100
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/points/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()
  
      mutate(`/api/points/${id}`, data, false) // Update the local data without a revalidation
      router.push(`/${data._id}`)
    } catch (error) {
      setMessage('Failed to update journey')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    
    const { id } = router.query

    try {
      const res = await fetch(`/api/points/${id}`, {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()
      router.push(`/${data._id}`)
    } catch (error) {
      setMessage('Failed to add point')
    }
  }

  const handleChange = (e) => {
    const target = e.target     
    //const value = target.name === 'location'? validateLocation(target.value) : target.value; //coordinates change should cause street view to update
    
    if (target.name === 'location') {
      setForm(validateLocation(target.value));
    } else {
      const value = target.value
      const name = target.name
      setForm({
        ...form,
        [name]: value,
      })
      
    }
//    const value = validateLocation(form.location)[target.name]; //coordinates change should cause street view to update
    

    //setForm(validateLocation(form.location))
  }

  /* Makes sure point name is filled */
  const formValidate = () => {
    let err = {}
    if (!form.name) err.name = 'Name is required'   
    setForm(validateLocation(form.location));
    return err
  }

   const validateLocation = (locationValue) => {
    function getPosition(str, char, index) {
        return str.split(char, index).join(char).length;
      }

    //if it includes @ then parse as a Google Street View URL
    if (locationValue.includes('@')) {
        const slicedLocationValue = locationValue.slice(locationValue.indexOf('@') + 1);
        const secondCommaAt = getPosition(slicedLocationValue, ',', 2)
        const parsedLocation = slicedLocationValue.slice(slicedLocationValue.indexOf('@') + 1, secondCommaAt);        
        //get heading, pitch and fov values too
        const thirdCommaAt = getPosition(slicedLocationValue, ',', 3);
        const fov = slicedLocationValue.slice(thirdCommaAt + 1, slicedLocationValue.indexOf('y'))   
        const fourthCommaAt = getPosition(slicedLocationValue, ',', 4)        
        const heading = slicedLocationValue.slice(fourthCommaAt + 1, slicedLocationValue.indexOf('h'));    
        const fifthCommaAt = getPosition(slicedLocationValue, ',', 5);
        const pitch = slicedLocationValue.slice(fifthCommaAt + 1, slicedLocationValue.indexOf('t'));        

        locationValue = parsedLocation;
        return {...form, location: parsedLocation, heading, pitch: (pitch - 90).toFixed(2), fov};
    }
    //if it starts with ( then parse as a coordinates set from mobile app (need to remove brackets and spaces)
    if (locationValue[0] === '(') {    
        locationValue = locationValue.replaceAll(/[\(\)\s]/g,'');
        return {...form, location: locationValue};
    }
  
    return {...form, location: locationValue};
}

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewPoint ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          maxLength="60"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          maxLength="100"
          name="location"
          value={form.location}
          onChange={handleChange}          
        />
        <LocationExplanation />

        {form.location && <div>
          <EmbedStreetView width={400} height={330} location={form.location} heading={form.heading} pitch={form.pitch} fov={form.fov} />
          <p>Adjust the values below to customise your view:</p>
          <label htmlFor="heading">Heading (orientation, -180 to 360)</label>
            <input
              type="number"
              maxLength="4"
              min="-180"
              max="360"
              name="heading"
              value={form.heading}
              onChange={handleChange}   
              step="any"       
            />
            <label htmlFor="pitch">Pitch (up/down, -90 to 90)</label>
            <input
              type="number"
              maxLength="4"
              min="-90"
              max="90"
              name="pitch"
              value={form.pitch}
              onChange={handleChange}     
              step="any"     
            />
            <label htmlFor="fov">FOV (field of view, 10 to 100)</label>
            <input
              type="number"
              maxLength="4"
              min="10"
              max="100"
              name="fov"
              value={form.fov}
              onChange={handleChange}     
              step="any"     
            />
          </div>
        }

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default PointForm
