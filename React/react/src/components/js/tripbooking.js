window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) { // Adjust the threshold as needed
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// document.getElementById('aboutus-link').addEventListener('click',function(event){
//     event.preventDefault();
//     document.getElementById('aboutus').scrollIntoView({
//         behavior:'smooth'
//     });
// });

// document.getElementById('footer-link').addEventListener('click',function(event){
//     event.preventDefault();
//     document.getElementById('footer').scrollIntoView({
//         behavior:'smooth'
//     });
// });