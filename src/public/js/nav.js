const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

function myFunction() {


   swal("Here's the title!", "...and here's the text!");

}

hamburger.addEventListener('click', ()=>{
   //Animate Links
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });


    //Hamburger Animation
    hamburger.classList.toggle("toggle")
});
