const Survey = require('../../models/Survey');
const answeredSurvey = require('../../models/AnsweredSurvey');
const mongoose = require('mongoose');

module.exports = (app) => {
    /*
     * save
     */
    app.post('/api/survey/save', (req, res, next) => {
      const { body } = req;
      let {
        data,
          title,
          userId
      } = body;

      if (!data) {
        return res.send({
          success: false,
          message: 'Error: No Data.'
        });
      }

      // Steps: TODO
      // 1. Verify survey doesn't exist
      // 2. Save
      Survey.find({
        title: title
      }, (err, previousSurvey) => {
        if (err) {
          return res.status(404).send({
            success: false,
            message: 'Error: Server error'
          });
        } else if (previousSurvey.length > 0) {
          return res.status(400).send({
            success: false,
            message: 'Error: Survey already exist.'
          });
        }

        // Save the new survey
        const newSurvey = new Survey();

        newSurvey._id = new mongoose.Types.ObjectId();
        newSurvey.userId = userId;
        newSurvey.title = title;
        newSurvey.data = data;
        newSurvey.save((err, user) => {
          if (err) {
            return res.status(404).send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.status(201).send({
            success: true,
            message: 'created'
          });
        });
      });
    });

    app.get('/api/survey/getUserSurveys', (req, res, next) => {
        const userId = req.query.userId;
        Survey.find({
            userId: userId
        })
            .exec()
            .then(doc => {
                if(doc) {
                    var data = [];
                    var id = 1;
                    doc.forEach(function(element) {
                        let result = {
                            id: id,
                            name: element.title,
                            duration: element.creationDate,
                            answerLink: 'http://localhost:6075/survey?_id=' + element._id,
                            results: 'http://localhost:6075/survey-analysis?surveyId=' + element._id
                        };
                        data.push(result);
                        id++;
                    });
                    console.log(data);
                    res.status(200).send({
                        success: true,
                        data: data
                    });
                }
                else {
                    res.status(404).json({
                        message: 'no survey found',
                        param: userId
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
    });

    app.get('/api/survey/getSurvey', (req, res, next) => {
        const _id = req.query._id;
        console.log(_id);
        Survey.findById(_id)
            .exec()
            .then(doc => {
                console.log(doc);
                if(doc) {
                    res.status(200).send({
                        success: true,
                        title: doc.title,
                        data: doc.data
                    });
                }
                else {
                    res.status(404).json({
                        message: 'no survey found',
                        param: _id
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
    });

    app.post('/api/survey/getAnsweredSurvey', (req, res, next) => {
        console.log('in get Answerd surveys');
        const surveyId = req.body.surveyId;
        console.log(surveyId);
        answeredSurvey.find({surveyId: surveyId})
            .exec()
            .then(doc => {
                console.log(doc);
                if(doc) {
                    data = [];
                    doc.forEach(function(element) {
                        data.push(element.data);
                    });
                    res.status(200).send({
                        success: true,
                        data: data
                    });
                }
                else {
                    res.status(404).json({
                        message: 'no survey found',
                        param: surveyId
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
    });

    app.post('/api/answeredSurvey/save', (req, res, next) => {
        const { body } = req;
      let {
          title,
          data,
          surveyId
      } = body;

      if (!data) {
        return res.status(400).send({
          success: false,
          message: 'Error: No Data.'
        });
      }

        // Save the new survey
        const newAnsweredSurvey = new answeredSurvey();

        newAnsweredSurvey._id = new mongoose.Types.ObjectId();
        newAnsweredSurvey.surveyId = surveyId;
        newAnsweredSurvey.title = title;
        newAnsweredSurvey.data = data;
        newAnsweredSurvey.save((err, user) => {
          if (err) {
            return res.status(404).send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.status(200).send({
            success: true,
            message: 'saved'
          });
        });
    });
};
