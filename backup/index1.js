import './index.css';

let objects = []
let isDrag = false
let objectActive = null
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const rect = canvas.getBoundingClientRect()
objects.push({
  x: 0, y: 0, width: 100, height: 200, color: '#00f'
})
objects.push({
  x: 300, y: 150, width: 100, height: 100, color: '#f00'
})

const drawing = (ctx) => {
  objects.forEach(({x, y, width, height, color}) => {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
  })
}

drawing(ctx)

const mouseDown = (ev) => { 
  const startX = ev.clientX - rect.left
  const startY = ev.clientY - rect.top

  objects.forEach((item) => {
    const {x, y, width, height} = item
    if(startX > x && startX < x+width && startY > y && startY < y+height) {
      objectActive = item
      isDrag = true
      console.log(objectActive)
    }
  })
}
const mouseMove = (ev) => {
  const {left, top, width, height} = rect

  if(objectActive != null && isDrag) {
    objectActive.x = (ev.clientX - left)
    objectActive.y = (ev.clientY - top)

    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawing(ctx)
  }
}  
const mouseUp = (ev) => {
  const {left, top, width, height} = rect
  if(objectActive != null && isDrag) {
    objectActive.x = ev.clientX - left
    objectActive.y = ev.clientY - top
    
    objectActive = null
    isDrag = false

    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawing(ctx)
  }
}
canvas.addEventListener('mousedown', mouseDown) // 마우스 클릭
canvas.addEventListener('mousemove', mouseMove)
canvas.addEventListener('mouseup', mouseUp)

