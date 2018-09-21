const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId
    },
    userId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: ''
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    creationDate: {
      type: Date,
      default: Date.now()
    }
  });

  module.exports = mongoose.model('Survey', SurveySchema);
