import dbConnect from '../../../lib/dbConnect'
import Point from '../../../models/Point'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const points = await Point.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: points })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const points = await Point.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: point })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
