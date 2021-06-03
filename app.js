const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

// const router = require('./router');

app.use('/public/', express.static('./public/')); // 开放资源

app.use(bodyParser.urlencoded({ extended: false }));	// 配置POST
// app.use(bodyParser.json());

// router(app); //路由，报错暂时不知道如何解决，文件先不分开了

// 定义函数
function getMachine(req) {
  let deviceAgent = req.headers["user-agent"].toLowerCase();
  let agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
  if (agentID) {
    return 1; // 移动端
  } else {
    return 0; // PC端
  }
}

function writeJson(params) {
  fs.readFile('./public/json/index.json', function (err, data) {
    if (err) {
      return console.error(err);
    }
    let allUser = data.toString();
    allUser = JSON.parse(allUser);  // 对空字符串不能使用该方法，所以初始情况下json文件不能为空
    allUser.push(params);
    let str = JSON.stringify(allUser);
    fs.writeFile('./public/json/index.json', str, function (err) {
      if (err) {
        console.error(err);
      }
      console.log('index.json：新增用户数据成功');
    })
  })
}

function findJson(str) {
  return new Promise((resolved, rejected) => {
    fs.readFile('./public/json/index.json',
      function (err, data) {
        if (err) {
          rejected(err)
          return console.error(err);
        }
        let allUser = data.toString();
        allUser = JSON.parse(allUser);
        user = allUser.find(function (user) {
          return user.id === str;
        })
        resolved(user);
      })
  })
}

app.get('/', function (req, res) {
  let machine = getMachine(req);
  if (machine) {
    fs.readFile('./pe-views/index.html', function (err, data) {
      res.end(data);
    })
  }
  else {
    fs.readFile('./pc-views/index.html', function (err, data) {
      res.end(data);
    })
  }
});

app.get('/login', function (req, res) {
  fs.readFile('./pc-views/login.html', function (err, data) {
    res.end(data);
  })
});

app.post('/login', function (req, res) {
  // console.log(req.body);
  if (req.body.type == 2){ // 注册，不能用'==='，因为2是字符串
    findJson(req.body.id).then(user => {
      console.log(user);
      if (user === undefined) {
        writeJson(req.body);
        res.send({
          "status": 200
        });
      }
      else {
        res.send({
          "status": 499,
          "msg": "user already registered"
        });
      }
    })
  }
  else { // 登录
    findJson(req.body.id).then(user => {
      console.log(user);
      if (user === undefined) {
        res.send({
          "status": 404,
          "msg": "user not registered"
        });
      }
      else {
        if (req.body.password != user.password) {
          res.send({
            "status": 400,
            "msg": "password incorrect"
          });
        }
        else {
          res.send({
            "status": 200,
            "msg": "ok"
          });
        }
      }
    })
  }
});

app.listen(3000, function () {
  console.log('服务器启动成功，可以通过 http://127.0.0.1:3000/ 来进行访问');
})
