var express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);
const mysql = require('mysql')
const cors = require("cors")
app.use(cors())
app.use(express.json())

const {Server} = require("socket.io");

var data = [];
var info;

const io = new Server(6001, {
    cors: {
        origin: "*"
    }   
}); 

const db = mysql.createConnection({
    user : 'root',
    host : 'localhost',
    password: 'root',
    database: 'stick',  
})

function GetData(req, res) {
    const id = req.params.id
    db.query(`SELECT * from data where userId=${id}`,
    (err,result)=>{
        if(err){
            console.log(err)
            res.send(result)
        }else{
            console.log(result)
            res.send(result)
        }
    })
};
function Wifi(req,resp){
    const wifi = req.query.wifi
    io.emit("send_wifi",wifi) ;
    if(wifi!=null){
        resp.send({ "Status": 200 });
    }
    if (wifi === []){
        resp.status(401);
        resp.send({ "Error": "something wrong happened" });
    }
    console.log(wifi)       
}
function PostData(req,resp){
    var today = new Date()
    info = { "distance": parseInt(req.query.distance), "Time": today.getSeconds() }
    io.emit("send_data", info);
    if(data.length>59){
        const average = (data.reduce((a,b)=>a+b,0)/data.length).toFixed(2)
        Store(average)
        data=[]
    }
    if(info!=[]){
        data.push( parseInt(req.query.distance));
        resp.send({ "Status": 200 });
    }
    if (info === []){
        resp.status(401);
        resp.send({ "Error": "something wrong happened" });
    }
    console.log(info);
}
function Store(data){
    db.query("INSERT INTO `data`(`range`,`userID`) values(?,?)",[data,1],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log("values inserted")
        }
    })
}
function Register(req,resp){
    const userName = req.body.userName
    const password = req.body.password
    const email = req.body.email
    const phoneNumber = req.body.phoneNumber
    const nickname = req.body.nickname
    const citizenship = req.body.citizenship
    const birthdate = req.body.birthdate
    const role = req.body.role
    const name = req.body.name
    db.query('INSERT INTO user(password,username,role,citizenship,email,phoneNumber,nickname,name,birthdate) VALUES(?,?,?,?,?,?,?,?,?)'
    ,[password,userName,role,citizenship,email,phoneNumber,nickname,name,birthdate],
    (err,result)=>{
        if(err){
            console.log(err)
            resp.send({
                error:true
            })
        }else{
            resp.send({
                error:false
            })
        }
    })
}
function Login(req,resp){
    const username = req.body.username
    const password = req.body.password
    db.query(`SELECT id from user WHERE username="${username}" && password ="${password}"`,
    (err,result)=>{
        if(result.length!=0){
            resp.send({
                validated : true,
                id : result[0].id
            })
        }else{
            resp.send(false)
        }
    })
}
function getUsername(req,resp){
    const userName = req.params.id
    db.query(`SELECT userName from user where userName="${userName}"`,
    (err,result)=>{
        if(result.length===0){
            resp.send({
                "valid" : true
            })
        }else{
            resp.send({
                "valid" : false
            })
        }
    })
}
function getUserID(req,resp){
    const userID = req.params.id
    db.query(`SELECT * from user where id="${userID}"`,
    (err,result)=>{
        if(result.length===0){
            resp.send({
                "valid" : false
            })
        }else{
            console.log(result)
            resp.send({
                "valid" : true,
                "data" : result[0]
            })
        }
    })
}
app.post('/login',Login)
app.post ('/register',Register)
app.get("/history/:id",GetData)
app.post("/wifi",Wifi)
app.post("/submit", PostData);
app.get("/get", GetData);
app.get("/availableUsername/:id",getUsername)
app.get("/getUserID/:id",getUserID)
app.listen(3001,()=>{
    console.log("listening to 3001")
});