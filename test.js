//testing using mocha and chai
const { expect } = require('chai');
const chai = require('chai');
var request = require('supertest');
var app = require('../restnode/app');

//successfuly calculate BMI
describe("Calculating BMI",function(){
    it('should calculate BMI and response good',function(done){
        request(app)
          .get('/feed/calculate')
          .send([{"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, { "Gender": "Male", "HeightCm": 161, "WeightKg":
            85 }, { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 }, { "Gender": "Female", "HeightCm": 166,
            "WeightKg": 62}, {"Gender": "Female", "HeightCm": 150, "WeightKg": 70}, {"Gender": "Female",
            "HeightCm": 167, "WeightKg": 82}]
           )
           .expect('Content-Type',/json/)
           .expect(200)
           .end(function(err,res){
               if(err){
                   return done(err);
               }
           done();
        });
    });
    //because invalid parameter
    it('should calculate BMI but response Not good',function(done){
        request(app)
          .get('/feed/calculate')
          .send({bcmcmc:"bckhgjhcsbc"})
           .expect('Content-Type',/json/)
           .expect(500)
           .end(function(err,res){
               if(err){
                   return done(err);
               }
           done();
        });
    });
    //because not given input
    it('should Not calculate BMI and also response Not good',function(done){
        request(app)
          .get('/feed/calculate')
           .expect('Content-Type',/json/)
           .expect(500)
           .end(function(err,res){
               if(err){
                   return done(err);
               }
           done();
        });
    });
    //path error
    it('should path is missmatches',function(done){
        request(app)
          .get('/fee/calculate')
          .send([{"Gender": "Male", "HeightCm": 171, "WeightKg": 96 }, { "Gender": "Male", "HeightCm": 161, "WeightKg":
          85 }, { "Gender": "Male", "HeightCm": 180, "WeightKg": 77 }, { "Gender": "Female", "HeightCm": 166,
          "WeightKg": 62}, {"Gender": "Female", "HeightCm": 150, "WeightKg": 70}, {"Gender": "Female",
          "HeightCm": 167, "WeightKg": 82}])
          .set('Accept','text/html')
           .expect('Content-Type',/text/)
           .expect(404)
           .end(function(err,res){
               if(err){
                   return done(err);
               }
           done();
        });
    });
});