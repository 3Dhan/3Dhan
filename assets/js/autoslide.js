var slideDuration = 2000; //2 Seconeds
var containers = null;
var slideIndex = 0;

startSlide();


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
    }


    showSlides();
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

function showSlides() {
    if ( checkAnimationRange() ) {
        for (var i=0;i<containers.length;i++) {
            var j;

            var slides = containers[i].getElementsByClassName("slide");
            // var navText = containers[i].getElementsByClassName("nav");
            var navText = containers[i].getElementsByClassName("nav");

            for (j = 0; j < slides.length; j++) {
                slides[j].style.display = "none";  
            }

            containers[i].slideIndex++;

            if (containers[i].slideIndex > slides.length) {
                containers[i].slideIndex = 1
            }  

            // console.log("text: " + navText[0].innerText);
            navText[0].innerText = containers[i].slideIndex + " / " + slides.length;
            slides[containers[i].slideIndex-1].style.display = "block";  
        }
    }

    setTimeout(showSlides, slideDuration); // Change image every 2 seconds
}