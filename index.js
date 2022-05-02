const canvas = new fabric.Canvas("canvas",{
    width:700,
    height:450,
    backgroundColor:"grey"
    // selection:false
});

canvas.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    // console.log(delta)
    var zoom = canvas.getZoom();
    // console.log(zoom)

    zoom *= 0.999 ** delta;
    if (zoom > 40) zoom = 40;
    if (zoom < 1) zoom = 1;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
    var vpt = this.viewportTransform;
    if (zoom === 1) {
      vpt[4] = 0;
      vpt[5] = 0;
    }   
});
canvas.renderAll();

//get image from user

var upload_image="";
const image = document.querySelector("#image"); 

image.addEventListener("change",()=>{
    // console.log(image.files)
    const reader = new FileReader();

    // console.log(reader)
    reader.addEventListener("load",()=>{
        upload_image=reader.result;
    })
    reader.readAsDataURL(image.files[0]);
});


const setImage =() =>{
  setImg();
}
const setImg = ()=>{
  // canvas.backgroundImage=img;
  fabric.Image.fromURL(upload_image,(img)=>{
   
    canvas.backgroundImage=img;
    canvas.viewportCenterObject(img);
    canvas.renderAll();
    // canvas.add(img);
});
}