

// console.log("sdf")


// function fetch(url) {
//   return new Promise(resolve => {
//       setTimeout(() => resolve({
//         designId: 1,
//         shapes: [
//           {shapeId: 'basic-shape', color: { r: 55, g: 40, b: 255 }, children: []},
//           {shapeId: 'duck', color: { r: 255, g: 255, b: 252 }, children: [
//             {shapeId: 'duck-bill', color: { r: 255, g: 255, b: 255 }, children: []},
//             {shapeId: 'duck-body', color: { r: 205, g: 255, b: 252 }, children: []},
//             {shapeId: 'duck-legs', color: { r: 100, g: 255, b: 252 }, children: []},
//           ]},
//           {shapeId: 'zigzag-polygon', color: { r: 205, g: 255, b: 252 }, children: []},
//           {shapeId: 'fish', color: { r: 205, g: 255, b: 252 }, children: [
//             {shapeId: 'fish-eyes', color: { r: 255, g: 255, b: 255 }, children: []},
//             {shapeId: 'fish-fin', color: { r: 100, g: 66, b: 74 }, children: [
//               {shapeId: 'fish-fin-part-1', color: { r: 93, g: 54, b: 55 }, children: []},
//               {shapeId: 'fish-fin-part-2', color: { r: 33, g: 255, b: 255 }, children: []},
//               {shapeId: 'fish-fin-part-3', color: { r: 128, g: 53, b: 255 }, children: []},
//             ]},
//             {shapeId: 'fish-tail', color: { r: 255, g: 5, b: 255 }, children: []},
//           ]},
//           {shapeId: 'duck', color: { r: 255, g: 255, b: 252 }, children: [
//             {shapeId: 'duck-bill', color: { r: 255, g: 255, b: 255 }, children: []},
//             {shapeId: 'duck-body', color: { r: 205, g: 255, b: 252 }, children: []},
//             {shapeId: 'duck-legs', color: { r: 100, g: 255, b: 252 }, children: []},
//           ]},
//         ]
//       }), Math.random() * 400);
//   });
// }
// const ConcatChildren = (shapes)=>{
  
  
//   let returnValue = shapes.map(e=>({color: e.color, shapeId: e.shapeId}));
//   shapes.forEach(f => {
//     if (f.children){
//       returnValue =returnValue.concat(ConcatChildren(f.children))
//     }
//   })
//   return returnValue;
// }

// const GetData =async (id = 1)=>{
//   const response = await fetch(`/design/${id}`)
//   const datas=[]
//   const sumColor= {r:0,g:0, b:0}
//   const responseWithChildren = ConcatChildren(response.shapes);
//   let distinct=[]
//   responseWithChildren.forEach(e=>{
    
//     if (!distinct.some(f=>f.shapeId == e.shapeId)){
//       distinct.push(e)
//     }
//   })
//   console.log(distinct)
//   distinct.forEach(element => {
//     sumColor.r += element.color.r
//     sumColor.g += element.color.g
//     sumColor.b += element.color.b
//   })
//   const length = distinct.length
//   console.log(sumColor)

//   sumColor.r = sumColor.r/length
//   sumColor.g = sumColor.g/length
//   sumColor.b = sumColor.b/length

//   datas.push(sumColor)

//   if (id<10){
//       return datas.concat(await GetData(id+1))
//   }else {
//       return datas
//   }
// }

// GetData(1).then(e=>console.log(e))








const express = require('express')
const axios = require('axios');
var cors = require('cors')


const app = express()
const port = 4000

//middleware
app.use(cors())

app.get('/',async (req, res)  => {
    const url = req.query?.url || "";
    const apiKey = req.header('x-api-key') || ""
    let responseValue={};
    try {
        const response = await axios.get(url, {headers:{"x-api-key": apiKey}});
        responseValue = response.data
        //console.log(responseValue);
      } catch (error) {
        console.error(error);
        responseValue=error;
    }
    
    res.send(responseValue)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
