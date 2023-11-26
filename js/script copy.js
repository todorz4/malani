



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




