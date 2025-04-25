// models/Contribution.js
import mongoose from 'mongoose';

const ContributionSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    
    type: String,
    required: true
  },
  contributedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Contribution', ContributionSchema);
