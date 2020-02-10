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

let reviewIndex = 1;
showReviews(reviewIndex);

function showReviews(k) {
    var k;
    let reviews = document.getElementsByClassName("reviews_carousel_item");

    if(k < 1) {
        reviewIndex = reviews.length;
    } else if (k > reviews.length) {
        reviewIndex = 1;
    }
    for(k = 0; k < reviews.length; k++) {
        reviews[k].style.display = "none";
    }
    reviews[reviewIndex - 1].style.display = "block";
}

function plusReview(k) {
    showReviews(reviewIndex += k);
}



