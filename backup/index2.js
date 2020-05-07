import './index.css'

class Canvas {
  constructor(id){
    this.id = id
    this.canvas = document.getElementById(id)
    this.rect = this.canvas.getBoundingClientRect()
    this.data = {type: 'rect', x: 0, y: 0, width: 0, height: 0, style: '#000', url: null}
    this.shapes = []
    this.isDrag = false
    this.currentX = 0
    this.currentY = 0
    this.currentCanvas = null
  }
  drawCanvas(data = this.data){
    const {type, x, y, width, height, style, url} = data
    this.shapes.push(data)

    const canvas = this.canvas
    const ctx = canvas.getContext('2d')
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

    canvas.addEventListener('mousedown', this.mousedown)
    // canvas.addEventListener('mousedown', (ev) => {
    //   const {clientX, clientY} = ev
    //   const {left, top} = this.rect
      
    //   this.currentX = clientX - left
    //   this.currentY = clientY - top
    
    //   this.shapes.forEach((item) => {
    //     const {x, y, width, height} = item
    //     if(this.currentX > x && this.currentX < (x+width) && this.currentY > y && this.currentY < (y+height)) {
    //       this.currentCanvas = item
    //       this.isDrag = true
    //       console.log(item)
    //     }
    //   })
    // })
  }
  mousedown(){
    console.log(this.canvas)
  }
}

const canvas = new Canvas('canvas')
canvas.drawCanvas(
  {
    type: 'image',
    width: 120,
    height: 120,
    x: 100,
    y: 120,
    url: 'https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/file/200420_fc_seoul/sticker6.png'
  }
)
canvas.drawCanvas({
  type: 'image',
  width: 150,
  height: 150,
  x: 300,
  y: 200,
  url: 'https://hashsnap-static.s3.ap-northeast-2.amazonaws.com/file/200420_fc_seoul/sticker9.png'
})

