const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const nodeExcel = require('excel-export')
const fs = require('fs');

const app = express();
const data = require('./data');

app.use(cors({
  origin: '*',
  allowedHeaders: ['content-type'],
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.post('/getData', (req, res) => {
  // const {name, pwd} = req.body;
  // if (!name || !pwd) {
  //   return res.json({
  //     code: 200,
  //     data: {},
  //     errorMessage: '参数不能为空'
  //   })
  // }
  // setTimeout(() => {
  //   res.json({
  //     code: 200,
  //     data: {name, pwd},
  //     errorMessage: '参数不能为空'
  //   })
  // }, 5000);
  res.json({
    status: "success",
    totals: 97,
    data,
  })
})

app.post('/exportExcel', async (req, res, next) => {
  // 模拟从数据库获取表格数据
  var tableData = [
    { name: '张三', age: 20, school: '中南财经政法大学', date: '2020/12/12', safe: true },
    { name: '李四', age: 22, school: '华中科技大学', date: '2020/12/12', safe: true },
    { name: '王二', age: 23, school: '武汉大学', date: '2020/12/12', safe: true }
  ]
  var conf ={};
  conf.name = "mysheet";
  conf.cols = [{
    caption:'姓名',
    type:'string',
  },{
    caption:'年龄',
    type:'number',
  },{
    caption:'学校',
    type:'string',
    width: 50
  },{
    caption:'入学时间',
    type:'string',
    width: 50
  },{
    caption:'体温是否正常',
    type:'bool',
    width: 50
  }];
  conf.rows = tableData.reduce((init, item) => {
    init.push([item.name, item.age, item.school, item.date, item.safe])
    return init
  }, [])
  var result = nodeExcel.execute(conf);
  // xlsx格式
  res.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
  res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");

  // xls格式
  // res.setHeader('Content-Type', 'application/vnd.ms-excel;charset=utf-8');
  // res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xls");
  res.end(result, 'binary');
  // res.write(result, 'binary');
  // res.end();
  // res.send(Buffer.from(result))
  // const src = fs.createReadStream('./Report.xlsx');
  // src.pipe(res);
})

app.listen(8088, () => {
  console.log('server is listening 8088');
})