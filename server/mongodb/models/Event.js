import mongoose from 'mongoose';
const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

/* This code is defining a method called `toJSON` on the `eventSchema`. This method is used to
transform the document returned by Mongoose into a JSON object. */
eventSchema.method('toJSON', function () {
  const { __v, _id, ...obj } = this.toObject();
  obj.id = _id;
  return obj;
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
