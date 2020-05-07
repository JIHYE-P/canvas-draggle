import './index.css'
import 'babel-polyfill'

const datas = [
  {
    type: 'image',
    width: 100,
    height: 100,
    x: 300,
    y: 40
  }
]

const getImage = (src) => new Promise(res => {
  const img = new Image
  img.onload = () => res(img)
  img.src = src
})

let dragData = null
let isDrag = false
let delta = new Object()
let image = []

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const saveImage = async() => image = await getImage('https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/file/200420_fc_seoul/sticker9.png')

const drawImage = data => {
  const {width, height, x, y} = data
  ctx.drawImage(image, x, y, width, height)
}

const drawRect = data => {
  const {width, height, x, y, style} = data
  ctx.fillStyle = style
  ctx.fillRect(x, y, width, height)
}

const drawCanvas = datas => {
  ctx.clearRect(0,0,canvas.width,canvas.height)
  for(const data of datas) {
    switch(data.type) {
      case 'rect': drawRect(data)
      break;
      case 'image': drawImage(data)
      break;
    }
  }
}

const mousePoint = (canvas, ev) => { 
  const rect = canvas.getBoundingClientRect()
  return {
    pointX: Math.round(ev.clientX - rect.left),
    pointY: Math.round(ev.clientY - rect.top)
  }
}

const handleMouseDown = (ev) => {
  const {pointX, pointY} = mousePoint(canvas, ev)
  for(const data of datas){
    const {x, y, width, height} = data
    if(pointX > x && pointX < (x+width) && pointY > y && pointY < (y+height)) {
      isDrag = true
      dragData = data
      
      delta.X = x-pointX
      delta.Y = y-pointY

      canvas.zIndex = 10
      drawCanvas(datas)
      return
    }
  }
}

const handleMouseMove = (ev) => {
  if(isDrag) {
    const {pointX, pointY} = mousePoint(canvas, ev)
    dragData.x = pointX + delta.X
    dragData.y = pointY + delta.Y
    drawCanvas(datas)
  }
}

const handleMouseUp = (ev) => {
  if(isDrag) {
    isDrag = false
    drawCanvas(datas)
  }
}

const main = async() => {
  try{
    await saveImage()
    drawCanvas(datas)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
  }catch(ev){
    console.error
  }
}

main()

