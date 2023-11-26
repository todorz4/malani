function ajaxCallBack(filename, result){ 
    $.ajax({
        url: "json/" + filename,
        method: "get",
        dataType: "json",
        success: result,
        error: function(xhr, error, status){
            console.log(xhr)  
        }
    });
}
window.onload=function(){

    ajaxCallBack("vrsteProizvoda.json", function(result){
        console.log(result);
        ispisVrsteProizvoda(result);
    })


    function ispisVrsteProizvoda(niz){


        let html="";
        for(let n of niz){

            html+=`<div class="box">
            <div class="content">
                <h1> ${n.naslov}</h1>
                <a href="proizvodi.html"> <button class="kupi"> Kupi</button></a>
            </div>
            <div class="middle">

            </div>
            <img src="${n.slika}" class="flex-slika" alt="${n.naslov}">

        </div>`;
            document.querySelector(".flex").innerHTML=html;

        }
    }








const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {

        //otvori meni
        nav.classList.toggle('nav-active');


        //animiraj linkove
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index/7+0.5}s`;
            }
        });

        //animacija burgera
        burger.classList.toggle('toggle');

    });
}

navSlide();

/*Put do Jankovog pakla*/
const logo = document.querySelectorAll("#logo-naslov path");

for (let i = 0; i < logo.length; i++) {
    console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
}


var slideIndex = 0;
slideshow();

function slideshow() {
    var i;
    var x = document.getElementsByClassName("slideSlika");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) { slideIndex = 1 }

    x[slideIndex - 1].style.display = "block";
    setTimeout(slideshow, 4000);
}



//Forma

document.getElementById("dugme-posalji").click;
document.getElementById("dugme-obrisi").click;



}