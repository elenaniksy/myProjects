let slideIndex = 1;
/*let prevBtn = document.getElementsByClassName("prev");
let nextBtn = document.getElementsByClassName("prev");*/
showSlides(slideIndex);

function showSlides(n) {
    var i;
    let slides = document.getElementsByClassName("slideItem");
    let dots = document.getElementsByClassName("dot");

    if(n < 1) {
        slideIndex = slides.length;
    } else if (n > slides.length) {
        slideIndex = 1;
    }
    for(let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className+= "active";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlides(n) {
    showSlides(slideIndex = n);
}

