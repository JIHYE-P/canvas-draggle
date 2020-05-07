import './index.css'

const datas = [
  {
    type: 'image',
    width: 80,
    height: 80,
    x: 100,
    y: 120,
    style: null,
    url: 'https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/file/200420_fc_seoul/sticker6.png'
  },
  {
    type: 'rect',
    width: 150,
    height: 150,
    x: 300,
    y: 200,
    style: '#0f0',
    url: null
  },
  {
    type: 'image',
    width: 100,
    height: 100,
    x: 300,
    y: 40,
    style: null,
    url: 'https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/file/200420_fc_seoul/sticker9.png'
  }
]

// ctx.clearRect(0,0,canvas.width,canvas.height);
const getImage = (src) => new Promise(res => {
  const img = new Image
  img.onload = () => res(img)
  img.src = src
})

const main = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  let dragData = null
  let isDrag = false
  let delta = new Object()
  let image;
  const drawImage = (data) => {
    const {x, y, width, height, url} = data
    getImage(url).then(img => image = img) 
  }

  const drawRect = data => {
    const {x, y, width, height, style} = data
    ctx.fillStyle = style
    ctx.fillRect(x, y, width, height)  
  }
  
  const drawCanvas = datas => {
    for(const data of datas) {
      switch(data.type) {
        case 'rect' : drawRect(data) 
        break;
        case 'image' : drawImage(data)
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
  
  drawCanvas(datas)
  canvas.addEventListener('mousedown', handleMouseDown)
  canvas.addEventListener('mousemove', handleMouseMove)
  canvas.addEventListener('mouseup', handleMouseUp)
}

main()

