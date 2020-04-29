import './index.css'

const datas = [
  {
    type: 'image',
    width: 120,
    height: 120,
    x: 100,
    y: 120,
    url: 'https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/file/200420_fc_seoul/sticker6.png'
  },
  {
    type: 'rect',
    width: 150,
    height: 150,
    x: 300,
    y: 200,
    style: '#0f0'
  },
  {
    type: 'image',
    width: 150,
    height: 150,
    x: 80,
    y: 20,
    url: 'https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/file/200420_fc_seoul/sticker9.png'
  }
]

const canvas = document.getElementById('canvas')
if(canvas.getContext) {
  const ctx = canvas.getContext('2d')
  let active = null
  let isDrag = false
  let delta = new Object()
  
  const drawCanvas = (datas) => { // canvas draw
    for(const data of datas) {
      const {type, x, y, width, height, style, url} = data

      switch (type) {
        case 'rect':
          ctx.fillStyle = style
          ctx.fillRect(x, y, width, height)
        break;
        case 'image':
          const img = new Image()
          img.onload = () => ctx.drawImage(img, x, y, width, height)
          img.src = url
        break;
      }
    }
    return datas
  }
  drawCanvas(datas)

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
        active = data
        delta.X = x-pointX
        delta.Y = y-pointY

        canvas.zIndex = 10
        ctx.clearRect(0,0,canvas.width,canvas.height);
        drawCanvas(datas)
        return
      }
    }
  }

  const handleMouseMove = (ev) => {
    if(isDrag) {
      const {pointX, pointY} = mousePoint(canvas, ev)
      
      active.x = pointX + delta.X
      active.y = pointY + delta.Y

      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawCanvas(datas)
    }
  }

  const handleMouseUp = (ev) => {
    if(isDrag) {
      isDrag = false
      ctx.clearRect(0,0,canvas.width,canvas.height);
      drawCanvas(datas)
    }
  }

  canvas.addEventListener('mousedown', handleMouseDown)
  canvas.addEventListener('mousemove', handleMouseMove)
  canvas.addEventListener('mouseup', handleMouseUp)

}