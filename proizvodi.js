function ajaxCallBack(filename, result) {
  $.ajax({
    url: "json/" + filename,
    method: "get",
    dataType: "json",
    success: result,
    error: function (xhr, error, status) {
      console.log(xhr);
    },
  });
}

var ukupno = 0;

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

window.onload = function () {
  ajaxCallBack("proizvodi.json", function (result) {
    console.log(result);
    for (let p of result) {
      let dugme = p.buttonId;
      let kolicina = "#" + p.dropId;
      let cena = p.cena.nova;
      document.body.addEventListener("click", function (event) {
        if (event.target.id == dugme) {
          dodajTekst(event.target, document.querySelector(kolicina), cena);
        }
      });
    }
    ispisProizvoda(result);
  });

  // Sortiranje
  document.getElementById("sortitaj").addEventListener("change", function () {
    let kategorijeId = Number(document.getElementById("filtriraj").value);
    let sortBy = Number(this.value);

    if (sortBy === 0) {
      return;
    }
    ajaxCallBack("proizvodi.json", function (result) {
      let filtered = result.filter((i) => {
        return kategorijeId === 0 ? true : i.idKategorije === kategorijeId;
      });

      // cena opadajuce
      if (sortBy === 1) {
        filtered.sort(function (a, b) {
          return b.cena.nova - a.cena.nova;
        });
      }
      // cena restuce
      else if (sortBy === 2) {
        filtered.sort(function (a, b) {
          return a.cena.nova - b.cena.nova;
        });
      }
      // naziv opadajuce
      else if (sortBy === 3) {
        filtered.sort(function (a, b) {
          return b.naziv.localeCompare(a.naziv);
        });
      }
      // naziv restuce
      else if (sortBy === 4) {
        filtered.sort(function (a, b) {
          return a.naziv.localeCompare(b.naziv);
        });
      }
      ispisProizvoda(filtered);
    });
  });

  // Po kategoriji
  // 1: Imunitet 2: Lepota 3: Zdravlje
  document.getElementById("filtriraj").addEventListener("change", function () {
    let filterById = Number(this.value);

    ajaxCallBack("proizvodi.json", function (result) {
      let filtered = result.filter((i) => {
        return filterById === 0 ? true : i.idKategorije === filterById;
      });
      ispisProizvoda(filtered);
    });
  });

  // Pretraga po imenu
  document.getElementById("pretraga").addEventListener("keyup", function () {
    let search = this.value;
    console.log(search);
    ajaxCallBack("proizvodi.json", function (result) {
      let filtered = result.filter((i) => {
        return i.naziv.toLowerCase().includes(search.toLowerCase());
      });
      ispisProizvoda(filtered);
    });
  });

  //
  function ispisProizvoda(proizvodi) {
    let html = "";
    for (let n of proizvodi) {
      html += ` <div class="proizvod-karta">
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
 </div>`;
    }
    document.querySelector(".proizvodi-kategorija").innerHTML = html;
    //proizvodiDugmici(proizvodi);
  }

  ajaxCallBack("proizvodi.json", function (result) {
    console.log(result);

    proizvodiDugmici(result);
    staraCena(result);
  });

  function staraCena(stara) {
    let html = "";
    if (stara != null) {
      html += `<del>${stara}</del>`;
    } else {
      html = "</br>";
    }

    return html;
  }

  /*Stranica prozivodi*/

  function proizvodiDugmici(proizvodi) {


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
      var telefon = telefonProvera();
      if (ime && prezime && adresa && telefon) {
        kontaktPoslato.innerHTML =
          "Porudzbina poslata! </br> Vaš račun iznosi: " + document.getElementById("cena").innerText + " RSD";
      }
    });

  

  const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    burger.addEventListener("click", () => {
      //otvori meni
      nav.classList.toggle("nav-active");

      //animiraj linkove
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = "";
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
        }
      });

      //animacija burgera
      burger.classList.toggle("toggle");
    });
  };

  navSlide();
};
