const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');


module.exports = (app) => {
  /*
   * Sign up
   */
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
      password,
      username
    } = body;
    let {
      email
    } = body;

    if (!username) {
      return res.send({
        success: false,
        message: 'Error: Username cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      })
    }

    email = email.toLowerCase();
    email = email.trim();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      username: username
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }

      // Save the new user
      const newUser = new User();

      newUser._id = new mongoose.Types.ObjectId()
      newUser.username = username;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });
    });

  });

  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      username
    } = body;

    if (!username) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    //email = email.toLowerCase();
    //email = email.trim();

    User.find({
      username: username
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }

      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id,
            userId: doc.userId
        });
      });
    });
  });

  app.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
          //console.log(sessions[0].userId);
          return res.send({
          success: true,
          message: 'Good',
            userId: sessions[0].userId
        });
      }
    });
  });

  app.get('/api/account/logout', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test

    // Verify the token is one of a kind and it's not deleted.

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });

  /*router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
      .exec()
      .then(doc => {
        console.log(doc);
        if(doc) {
          res.status(200).json(doc)
        }
        else {
          res.status(404).json({
            message: 'no user found',
            param: id
        });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
      });
  });*/

  app.get('/api/getUser', (req, res, next) => {
    const _id = req.query.userId;
    console.log(_id);
    User.findById(_id)
      .exec()
      .then(doc => {
        console.log(doc);
        if(doc) {
          //res.status(200).json(doc);
            res.send({
                success: true,
                username: doc.username,
                email: doc.email
            });
        }
        else {
          res.status(404).json({
            message: 'no user found',
            param: id
        });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
      });
  });

  /*router.get('/', (req, res, next) => {
    User.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  });*/

  app.get('/api/getUsers', (req, res, next) => {
    User.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
  });

  /*router.post('/', (req, res, next) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
    console.log(user);
    user
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Handling POST requests to /user',
        createdUser: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
})*/

  app.post('/api/addUser', (req, res, next) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: req.body.password
    });
    console.log(user);
    user
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Handling POST requests to /user',
        createdUser: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
  });

  app.post('/api/account/update', (req, res, next) => {
    console.log(req.body.data);
    const data = req.body.data;
    let _id = data.userId;
    let password = data.password;

    User.findById(_id, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        if (!user) {
          res.status(404).send();
        } else {
          user.password = user.generateHash(password);
          user.save((err, updatedUser) => {
            if (err) {
              res.status(500).send();
            } else {
              console.log(updatedUser);
              res.status(400).send()
            }
          });
        }
      }
    });
  });

  app.post('/api/account/resetPassword', (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;

    User.find({username: username}, (err, users) => {
        if (err) {
            console.log('err 2:', err);
            return res.status(401).send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length != 1) {
            return res(403).send({
                success: false,
                message: 'Error: Invalid'
            });
        }

        const user = users[0];
        const userId = user._id;
        const link = 'localhost:6075/settings?userId=' + userId;

        nodemailer.createTestAccount((err, account) => {
            const htmlEmail = `
            <h3>To reset your password follow the link and set a new password</h3>
            <a href=${link}>Link to reset password</a>
        `;
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'jieg6ooadatp3tap@ethereal.email', // generated ethereal user
                    pass: 'ZrsQcANEgRbR6x6cBc' // generated ethereal password
                }
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Support SurveyTool" <support@surveytool.com>', // sender address
                to: email, // list of receivers
                subject: 'Password Reset', // Subject line
                text: 'Hello ' + username, // plain text body
                html: htmlEmail // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

                res.status(200).send({
                    success: true
                });
            });
        });

    });

  });

  app.delete('/api/account/delete', (req, res, next) => {
    const userName = req.body.userName;

    User.delete(userName);
  });
};
