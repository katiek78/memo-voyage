import dbConnect from '../../../lib/dbConnect'
import Journey from '../../../models/Journey'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const journey = await Journey.findById(id)
        if (!journey) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: journey })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const journey = await Journey.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!journey) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: journey })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedJourney = await Journey.deleteOne({ _id: id })
        if (!deletedJourney) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
