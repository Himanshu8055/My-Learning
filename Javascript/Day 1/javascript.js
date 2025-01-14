document.addEventListener("DOMContentLoaded", () => {
const switches = document.getElementById("switch")

function button(){
    console.log("Himanshu")
    switches.innerHTML = "Himanshu";
    document.getElementById("switch").style.backgroundColor = "red";
    document.getElementById("switch").style.color = "white";
    document.getElementById("switch").style.padding = "1rem";
    document.getElementById("switch").style.margin = "1rem";

}

window.button = button; // Make the function available globally
});