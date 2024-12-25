// window.addEventListener("scroll", function() {
//     const header = document.querySelector("header");
    
//     if (window.scrollY > 100) { // You can change '100' to any value to specify when the action occurs
//         header.classList.add("scrolled");
//     } else {
//         header.classList.remove("scrolled");
//     }
// });

window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) { // Adjust the threshold as needed
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
