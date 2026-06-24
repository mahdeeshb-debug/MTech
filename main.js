function openImage(img) {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = img.src;
}

function closeImage() {
    document.getElementById("lightbox").style.display = "none";
}

 function odliczanie()
            {
              const zegar = document.getElementById("zegar");
              setInterval (() => {
                const dzisiaj = new Date();

               let godzina = dzisiaj.getHours();
               const minuta = dzisiaj.getMinutes();
               const sekunda = dzisiaj.getSeconds();
               
               const zero = (n) => n < 10 ? "0" + n : n;

              zegar.textContent = `${zero(godzina)}:${zero(minuta)}:${zero(sekunda)}`;
              }, 1000);
            }
            document.addEventListener("DOMContentLoaded",odliczanie);
            