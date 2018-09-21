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
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else if (previousSurvey.length > 0) {
          return res.send({
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
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success: true,
            message: 'created'
          });
        });
      });
    });

    /*
    app.post('/api/survey/getSurvey', (req, res, next) => {
        const _id = req.body._id;
        console.log(_id);
        Survey.findById(_id)
            .exec()
            .then(doc => {
                console.log(doc);
                if(doc) {
                    //res.status(200).json(doc)
                    res.send({
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
    */
    app.get('/api/survey/getUserSurveys', (req, res, next) => {
        const userId = req.query.userId;
        //console.log(userId);
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
                            answerLink: 'http://localhost:6075/survey?title=' + element.title,
                            results: 'http://localhost:6075/survey-analysis?userId=' + element.userId
                        };
                        data.push(result);
                        id++;
                    });
                    console.log(data);
                    //res.status(200).json(doc)
                    res.send({
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
                    //res.status(200).json(doc)
                    res.send({
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
        const title = req.body.title;
        console.log(title);
        answeredSurvey.find({title: title})
            .exec()
            .then(doc => {
                console.log(doc);
                if(doc) {
                    data = [];
                    doc.forEach(function(element) {
                        data.push(element.data);
                    });
                    //res.status(200).json(doc)
                    res.send({
                        success: true,
                        data: data
                    });
                }
                else {
                    res.status(404).json({
                        message: 'no survey found',
                        param: title
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
          data
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
      answeredSurvey.find({
        data: data
      }, (err, previousSurvey) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        } else if (previousSurvey.length > 0) {
          return res.send({
            success: false,
            message: 'Error: Survey already exist.'
          });
        }

        // Save the new survey
        const newAnsweredSurvey = new answeredSurvey();

        newAnsweredSurvey._id = new mongoose.Types.ObjectId();
        newAnsweredSurvey.title = title;
        newAnsweredSurvey.data = data;
        newAnsweredSurvey.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          }
          return res.send({
            success: true,
            message: 'saved'
          });
        });
      });
    });
}
