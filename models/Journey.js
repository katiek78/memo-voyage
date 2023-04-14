import mongoose from 'mongoose'

/* JourneySchema will correspond to a collection in your MongoDB database. */
const JourneySchema = new mongoose.Schema({
  name: {
    /* The name of this journey */

    type: String,
    required: [true, 'Please provide a name for this journey.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
})

export default mongoose.models.Journey || mongoose.model('Journey', JourneySchema)
