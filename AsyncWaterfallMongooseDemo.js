var async=require('async');
//var underscore=require('underscore');
var mongoose=require('mongoose');
var URIString='mongodb://localhost/Assignment_DB';
var employeeSchema=new mongoose.Schema({
    name:String,
    designation:String,
    contact_Number:Number
},{versionKey:false});
var newEmployee=mongoose.model('Employees',employeeSchema);
var sampleEmployee=new newEmployee({
    name:'deepa',
    designation:'SSE',
    contact_Number:888888888

});
// Connection to database..
function connection(callback){
    var conn=mongoose.connect(URIString,function(err){
        callback(err,conn);
    });

}
//inserting data in database...
function saveData(conn,callback){
    sampleEmployee.save(function(err){
        callback(err,conn);
    });

}
//Retrieving data from DB..
function findData(conn,callback){
    newEmployee.find({}).exec(function(err,result){
        callback(err,result);
    });
}
//waterfall demo.........with mongoose..
async.waterfall([connection,saveData,findData],function(err,res){
    if(err){
        console.log('error while fetching data....'+ err);
    }
    else{
        console.log('result:....\n');
        console.log(res);

    }
});