import './index.css'

const canvas = document.getElementById('canvas')
if(canvas.getContext){
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#000'
  ctx.fillRect(230, 120, 140, 120)

  const mousePoint = (ev) => {
    const {clientX, clientY} = ev
    const rect = canvas.getBoundingClientRect()
    
    return {
      pointX: Math.round(clientX - rect.left),
      pointY: Math.round(clientY - rect.top)
    }
  }
}
