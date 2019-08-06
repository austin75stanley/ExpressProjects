const mongoose= require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/EmployeeDB', {useNewUrlParser: true}, (err)=>{
  if (!err) {
    console.log('MongoDB connected successfully');
  } else {
    console.log('DBconnection error:' +err);
  }
});

require('./employee.model');
