const canvas = new fabric.Canvas("canvas",{
    width:700,
    height:450,
    backgroundColor:"grey"
    // selection:false
});


var zoom=0;
canvas.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    // console.log(delta)
    zoom = canvas.getZoom();
    // console.log(zoom)
    zoom *= 0.999 ** delta;
    if (zoom > 40) zoom = 40;
    if (zoom < 1) zoom = 1;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();

    //image back to its origanal position
    var vpt = this.viewportTransform;
    // console.log(vpt)
    if (zoom === 1) {
        vpt[4] = 0;
        vpt[5] = 0;
        console.log(canvas.getWidth()- 1000 * zoom)
        console.log(canvas.getHeight()- 1000 * zoom)
   
    }   
});

canvas.renderAll();

//get image from user
var upload_image="";

const image = document.querySelector("#image"); 

image.addEventListener("change",()=>{
    const reader = new FileReader();
    // console.log(reader)
    reader.addEventListener("load",()=>{
        upload_image=reader.result;
    })
    reader.readAsDataURL(image.files[0]);
});

//set image on the canvas 
var animate;

const setImage =() =>{
  fabric.Image.fromURL(upload_image,(img)=>{
    animate=img;
    // console.log(animate);
    canvas.backgroundImage=img;
    canvas.viewportCenterObject(img);
    canvas.renderAll();
});
}