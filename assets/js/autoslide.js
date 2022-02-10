var containers = null;
var slideIndex = 0;

window.onload = function() {
    startSlide();
}

function startSlide() {
    //컨테이너들 찾기 (슬라이드 들)
    containers = document.getElementsByClassName("slideshow-container");

    console.log("Slide Container Count : " + containers.length);
    for(var i=0;i<containers.length;i++) {
        //인덱스 초기화
        containers[i].slideIndex = 0;

        //사진 초기화
        var slides = containers[i].getElementsByClassName("slide");
        for (j = 1; j < slides.length; j++) {
            slides[j].style.display = "none";  
        }

        //애니메이션 시작
        showSlides(i, parseInt(containers[i].getAttribute("duration")) * 1000);
    }
}

//현재 work페이지에 있지 않을 경우 애니메이션을 진행하지 않기 위함. (렉 걸림)
function checkAnimationRange() {
    var twoPosY = $("#two").position().top;
    var workPosY = $("#work").position().top;
    var contactPosY = $("#contact").position().top;
    var curScrollY = window.scrollY;

    var srcRng = workPosY - ((workPosY - twoPosY) / 2);
    var dstRng = contactPosY - ((contactPosY - workPosY) / 2);

    //console.log(srcRng + " >= " + curScrollY + " <= " + dstRng);
    return !( srcRng >= curScrollY && curScrollY <= dstRng );
}

function showSlides(index, duration) {
    if ( checkAnimationRange() ) {
        var j;

        var slides = containers[index].getElementsByClassName("slide");
        var navText = containers[index].getElementsByClassName("nav-text");

        for (j = 0; j < slides.length; j++) {
            slides[j].style.display = "none";  
        }

        containers[index].slideIndex++;

        if (containers[index].slideIndex > slides.length) {
            containers[index].slideIndex = 1;
        }  

        // console.log("text: " + navText[0].innerText);
        navText[0].innerText = containers[index].slideIndex + " / " + slides.length;
        slides[containers[index].slideIndex-1].style.display = "block";
    }

    setTimeout(function() {
        showSlides(index, duration)
    }, duration); // Change image every 2 seconds
}

/**
 * 
 * @param {Element} element 
 * @param {number} direction: 0(Left), 1(Right) 
 */
function clickSlideArrow(element, direction) {
    // console.log( element.parentElement.parentElement.slideIndex );

    var container = element.parentElement.parentElement;

    var j;

    var slides = container.getElementsByClassName("slide");
    var navText = container.getElementsByClassName("nav-text");

    for (j = 0; j < slides.length; j++) {
        slides[j].style.display = "none";  
    }

    if (direction === 0) {
        container.slideIndex--;

        if (container.slideIndex <= 0) {
            container.slideIndex = slides.length;
        }  
    } else {
        container.slideIndex++;

        if (container.slideIndex > slides.length) {
            container.slideIndex = 1;
        }  
    }

    // console.log("text: " + navText[0].innerText);
    navText[0].innerText = container.slideIndex + " / " + slides.length;
    slides[container.slideIndex - 1].style.display = "block";
}