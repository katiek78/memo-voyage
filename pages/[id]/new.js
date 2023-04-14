import PointForm from '../../components/PointForm'

const NewPoint = () => {
  const pointForm = {
    name: ''
  }

  return <PointForm formId="add-point-form" pointForm={pointForm} />
}

export default NewPoint

