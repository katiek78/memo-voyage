import JourneyForm from '../components/JourneyForm'

const NewJourney = () => {
  const journeyForm = {
    name: '',
    image_url: ''
  }

  return <JourneyForm formId="add-journey-form" journeyForm={journeyForm} />
}

export default NewJourney
