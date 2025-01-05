window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) { // Adjust the threshold as needed
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});
