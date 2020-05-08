export const getImage = url => new Promise((res) => {
  const img = new Image;
  img.onload = () => res(img)
  img.onerror = () => res(null)
  img.src = url
})

 

