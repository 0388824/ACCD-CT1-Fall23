let firstSection = document.getElementById("sectionOne")
let firstImage = document.getElementById("imageone")
let buttonChangeColor = document.getElementById("colorbutton")
let buttonGenerateColor = document.getElementById("colorgenerate")
let buttonimagechange = document.getElementById("imagechange")
let buttonaddtext = document.getElementById("addTextBTN")

let addText = function(){
    let myParag = document.createElement("p")
    myParag.innerText = "Hello, I need to go take a nap"
    myParag.style.fontWeight = "bolder"
    firstSection.appendChild(myParag)
}

let changeimage = function(){
    firstImage.classList.toggle("imagetwo")
    if(firstImage.classList[0]=="imagetwo"){
       firstImage.src = "kyle.webp" 
    }
    else{
    firstImage.src = "RESPECT!.jpeg"
    }
}

let generateColor = function(){
    let redComp = Math.random()*255
    let greenComp = Math.random()*255
    let blueComp = Math.random()*255
    firstSection.style.backgroundColor ="rgb("+redComp+","+greenComp+","+blueComp+")"
}

let changeColor = function(){
    firstSection.style.backgroundColor = "rgb(170,250,170)"
}


firstSection.style.backgroundColor = "rgb(250,170,178)" 

buttonChangeColor.addEventListener("click",changeColor)

buttonGenerateColor.addEventListener("click",generateColor)

buttonimagechange.addEventListener("click",changeimage)

buttonaddtext.addEventListener("click",addText)