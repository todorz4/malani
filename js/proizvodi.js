
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

    ajaxCallBack("proizvodi.json", function(result){
        console.log(result);
       ispisProizvoda(result);
    })







function ispisProizvoda(proizvodi){

 let html="";
 for(let n of proizvodi){
     html+=` <div class="proizvod-karta">
     <div class="shadow">
         <div class="proizvod-slika">
             <img src="${n.slika}">
         </div>
         <div class="proizvod-opis">
             <h1>${n.naziv}</h1>
             <h3>${staraCena(n.cena.stara)}</h3>
             <h2>${n.cena.nova} RSD</h2>
             
             <div class="poruci">
                 <button id="${n.buttonId}"  class="dugme" value="${n.naziv}">Poruci</button>
                 <select class="kolicina-proizvoda" name="kolicina" id="${n.dropId}">
                     <option value="1">1</option>
                     <option value="2">2</option>
                     <option value="3">3</option>
                     <option value="4">4</option>
                     <option value="5">5</option>
                 </select>
             </div>
         </div>
     </div>
 </div>`
 }
document.querySelector('.proizvodi-kategorija').innerHTML=html;
}


ajaxCallBack("proizvodi.json", function(result){
  console.log(result);
 
  proizvodiDugmici(result);
  staraCena(result);
})



function staraCena(stara){
  let html=""
  if(stara !=null){
    
    
      html+=`<del>${stara}</del>`;
  }
    else {   html='</br>';
}
  
  return html;

}



/*Stranica prozivodi*/



function proizvodiDugmici(proizvodi) {
    for(let p of proizvodi){
    var ukupno = 0;
  
    document.getElementById("ta1").value = "\n";
   
        let dugme="#"+ p.buttonId;
        let kolicina= "#"+p.dropId;
        let cena = p.cena.nova;

        document.querySelector(dugme).addEventListener("click", function() { dodajTekst(this, document.querySelector(kolicina), cena); });
    }
 
   

    //document.querySelector('#dugme1').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina1'), 2000); });
    /*document.querySelector('#dugme2').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina2'), 1100); });
    document.querySelector('#dugme3').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina3'), 3600); });
    document.querySelector('#dugme4').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina4'), 2000); });
    document.querySelector('#dugme5').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina5'), 2000); });
    document.querySelector('#dugme6').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina6'), 2000); });
    document.querySelector('#dugme7').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina7'), 2000); });
    document.querySelector('#dugme8').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina8'), 2000); });
    document.querySelector('#dugme9').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina9'), 2000); });
    document.querySelector('#dugme10').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina10'), 2000); });
    document.querySelector('#dugme11').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina11'), 2000); });
    document.querySelector('#dugme12').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina12'), 2000); });
    document.querySelector('#dugme13').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina13'), 2000); });
    document.querySelector('#dugme14').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina14'), 2000); });
    document.querySelector('#dugme15').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina15'), 2000); });
    document.querySelector('#dugme16').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina16'), 2000); });
    document.querySelector('#dugme17').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina17'), 2000); });
    document.querySelector('#dugme18').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina18'), 2000); });
    document.querySelector('#dugme19').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina19'), 2000); });
    document.querySelector('#dugme20').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina20'), 2000); });
    document.querySelector('#dugme21').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina21'), 2000); });
    document.querySelector('#dugme22').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina22'), 2000); });
    document.querySelector('#dugme23').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina23'), 2000); });
    document.querySelector('#dugme24').addEventListener("click", function() { dodajTekst(this, document.querySelector('#kolicina24'), 2000); });
    */

   
        
    
 
   

    function dodajTekst(element, kolicina, cena) {
        var kol = kolicina.value;
        ukupno += cena * kol;
       document.getElementById("ta1").value += kol + "x " + element.value + "\n";
        console.log(element.value + " " + kol);
        element.disabled = true;
        kolicina.disabled = true;
        document.getElementById("cena").innerText = ukupno;

        document.getElementById("cena-labele").style.color = "black";
    }

    document.getElementById("ponisiti").addEventListener("click", () => {

        ukupno = 0;

        var dugmici = document.getElementsByClassName("dugme");
        for (let i = 0; i < dugmici.length; i++) {
            dugmici[i].disabled = false;
        }
        var kolicina = document.getElementsByClassName("kolicina-proizvoda");
        for (let i = 0; i < kolicina.length; i++) {
            kolicina[i].disabled = false;
            kolicina[i].value = 1;
        }
        document.getElementById("cena").innerText = ukupno;
        document.getElementById("cena-labele").style.color = "rgb(119, 119, 119)";
        document.getElementById("ta1").value = "\n";
    });

    const tbIme = document.getElementById("proizvodi-ime");
    const tbPrezime = document.getElementById("proizvodi-prezime");
    const tbAdresa = document.getElementById("proizvodi-adresa");
    const tbTelefon = document.getElementById("proizvodi-telefon");

    function imeProvera() {
        var regIme = /^[A-ZČĆŽĐŠ][a-zćčžđš]{1,14}$/;
        if (tbIme.value.length == 0) {
          document.getElementById("opis1").innerHTML = "Popunite ovo polje.";
          return false;
        } else if (!regIme.test(tbIme.value)) {
          document.getElementById("opis1").innerHTML = "Neispravan format imena.";
          return false;
        } else {
          document.getElementById("opis1").innerHTML = "";
          return true;
        }
      }
      function prezimeProvera() {
        var regPrezime = /^[A-ZČĆŽĐŠ][a-zćčžđš]{1,14}$/;
        if (tbPrezime.value.length == 0) {
          document.getElementById("opis2").innerHTML = "Popunite ovo polje.";
          return false;
        } else if (!regPrezime.test(tbPrezime.value)) {
          document.getElementById("opis2").innerHTML = "Neispravan format prezimena.";
          return false;
        } else {
          document.getElementById("opis2").innerHTML = "";
          return true;
        }
      }
      function adresaProvera() {
        var regAdresa = /^[A-Za-zČĆŽĐŠčćžđš'\.\-\s\,0-9]{3,}$/; 
        if (tbAdresa.value.length == 0) {
          document.getElementById("opis3").innerHTML = "Popunite ovo polje.";
          return false;
        } else if (!regAdresa.test(tbAdresa.value)) {
          document.getElementById("opis3").innerHTML = "Neispravan format adrese.";
          return false;
        } else {
          document.getElementById("opis3").innerHTML = "";
          return true;
        }
      }

      function telefonProvera() {
        var regTelefon = /^[0-9]{7,12}$/;
        if (tbTelefon.value.length == 0) {
          document.getElementById("opis4").innerHTML = "Popunite ovo polje.";
          return false;
        } else if (!regTelefon.test(tbTelefon.value)) {
          document.getElementById("opis4").innerHTML = "Neispravan format telefona.";
          return false;
        } else {
          document.getElementById("opis4").innerHTML = "";
          return true;
        }     
      }


      tbIme.addEventListener("blur", function () {
        imeProvera();
      });
      
      tbPrezime.addEventListener("blur", function () {
        prezimeProvera();
      });
      
      tbAdresa.addEventListener("blur", function () {
       adresaProvera();
      });
      tbTelefon.addEventListener("blur", function () {
         telefonProvera();
       });

             //  confirm("Vasa korpa: " + document.getElementById("ta1").value + "\nCena: " + document.getElementById("cena").innerText);

       document.getElementById("naruci").addEventListener("click", function () {
        var kontaktPoslato = document.getElementById("kontaktPoslato");
        kontaktPoslato.innerHTML = "";
        var ime = imeProvera();
        var prezime = prezimeProvera();
        var adresa = adresaProvera(); 
        var telefon  = telefonProvera(); 
        if (ime && prezime && adresa && telefon) {
          kontaktPoslato.innerHTML = "Porudzbina poslata! </br> Vaš račun iznosi: "+(document.getElementById("cena").innerText)+ " RSD";
        }
      });

  /*  document.getElementById("naruci").addEventListener("click", () => {
        let regexIme=/^[A-ZČĆŽĐŠ][a-zćčžđš]{1,14}$/;
        let regexAdresa= /^[A-Za-zČĆŽĐŠčćžđš'\.\-\s\,0-9]{3,}$/;     
        let regexTelefon=/^[0-9]{7,12}$/;   

        let brojGresaka;
        if (document.getElementById("ta1").value === '\n')  {
          alert("Vasa korpa je prazna");
          brojGresaka++;
        }
        
            if ((document.getElementById("proizvodi-ime").value === '')) {
                let opis="<p class='crveno'> Niste uneli vase ime</p>";
                document.getElementById("opis1").innerHTML=opis;
                brojGresaka++;
            }
        
          else if(!regexIme.test(document.getElementById("proizvodi-ime").value)) {
                let opis="<p class='crveno'>Ime nije u ispravnom formatu</p>";
                document.getElementById("opis1").innerHTML=opis;
                brojGresaka++;
            }
            else { 
                document.getElementById("opis1").remove();
                
            }
        
       
            if (document.getElementById("proizvodi-prezime").value === '') {
                let opis="<p class='crveno'>Niste uneli prezime</p>";
                document.getElementById("opis2").innerHTML=opis;
                brojGresaka++;
            } 
    
           else if(!regexIme.test(document.getElementById("proizvodi-prezime").value)) {
                let opis="<p class='crveno'>Prezime nije u ispravnom formatu</p>";
                document.getElementById("opis2").innerHTML=opis;
                brojGresaka++;
            }
            else{
                document.getElementById("opis2").remove();
                
            } 
    

        if (document.getElementById("proizvodi-adresa").value === '') {
                        let opis="<p class='crveno'>Niste uneli adresu</p>";
                        document.getElementById("opis3").innerHTML=opis;
                        brojGresaka++;
             } 
       else if(!regexAdresa.test(document.getElementById("proizvodi-adresa").value)) {
                        let opis="<p class='crveno'>Adresa nije u ispravnom formatu</p>";
                        document.getElementById("opis3").innerHTML=opis;
                        brojGresaka++;
                    }
       else{
                   document.getElementById("opis3").remove();
                        
                    }
    
                
              
      if (document.getElementById("proizvodi-telefon").value === '') {
                        let opis="<p class='crveno'>Niste uneli telefon</p>";
                        document.getElementById("opis4").innerHTML=opis;
                        brojGresaka++;
                    } 
       else if(!regexTelefon.test(document.getElementById("proizvodi-telefon").value)) {
                        let opis="<p class='crveno'>Telefon nije u ispravnom formatu</p>";
                        document.getElementById("opis4").innerHTML=opis;
                        brojGresaka++;
                    }
        else{
                        document.getElementById("opis4").remove();
                        
                    }
                
       
      
        if(brojGresaka==0) {
            confirm("Vasa korpa: " + document.getElementById("ta1").value + "\nCena: " + document.getElementById("cena").innerText);

            document.getElementById("proizvodi-ime").value = '';
            document.getElementById("proizvodi-prezime").value = '';
            document.getElementById("proizvodi-adresa").value = '';
            document.getElementById("proizvodi-telefon").value = '';
            document.getElementById("ta1").value = "";

        }
    });*/
}
ajaxCallBack("proizvodi.json", function(result){
  console.log(result);
 
  filtriranjePoTekstu(result);
  
})

function filtriranjePoTekstu(proizvodi){
  let pretraga = document.getElementById('pretraga').val().toLowerCase().trim();
  if(pretraga == ""){
      return proizvodi;
  }
  data.isFiltered = true;
  return proizvodi.filter(el=>{
      if(el.title.toLowerCase().includes(pretraga)){
          return true;
      }
      return false;
  });
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










}
