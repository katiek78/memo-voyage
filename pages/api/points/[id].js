import dbConnect from '../../../lib/dbConnect'
// import Point from '../../../models/Point'
import Journey from '../../../models/Journey'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    // case 'GET' /* Get a model by its ID */:
    //   try {
    //     const point = await Point.findById(id)
    //     if (!point) {
    //       return res.status(400).json({ success: false })
    //     }
    //     res.status(200).json({ success: true, data: point })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break

    // case 'PUT' /* Edit a model by its ID */:
    //   try {
    //     const point = await Point.findByIdAndUpdate(id, req.body, {
    //       new: true,
    //       runValidators: true,
    //     })
    //     if (!point) {
    //       return res.status(400).json({ success: false })
    //     }
    //     res.status(200).json({ success: true, data: point })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break

    // case 'DELETE' /* Delete a model by its ID */:
    //   try {
    //     const deletedPoint = await Point.deleteOne({ _id: id })
    //     if (!deletedPoint) {
    //       return res.status(400).json({ success: false })
    //     }
    //     res.status(200).json({ success: true, data: {} })
    //   } catch (error) {
    //     res.status(400).json({ success: false })
    //   }
    //   break

    case 'POST' /* Add a point by journey ID */ :
        console.log(id);
        try {                        
          const point = await Journey.findByIdAndUpdate(
                id, 
                { $addToSet: { points: req.body }}
          ) /* create a new point */
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
