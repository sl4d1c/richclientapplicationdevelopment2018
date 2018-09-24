const mongoose = require('mongoose');

const AnsweredSurveySchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId
    },
    surveyId: {
      type: mongoose.Schema.Types.ObjectId
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

  module.exports = mongoose.model('AnsweredSurvey', AnsweredSurveySchema);
