// Model index file to set up all associations
const User = require('./User');
const Session = require('./Session');
const Teacher = require('./Teacher');
const Subject = require('./Subject');
const SubjectTeacher = require('./SubjectTeacher');
const AttendanceRoom = require('./AttendanceRoom');
const Student = require('./Student');
const Attendee = require('./Attendee');
const Enrollment = require('./Enrollment');
const AttendanceRecord = require('./AttendanceRecord');

const models = {
  User,
  Session,
  Teacher,
  Subject,
  SubjectTeacher,
  AttendanceRoom,
  Student,
  Attendee,
  Enrollment,
  AttendanceRecord
};

// Set up all associations
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
