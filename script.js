const boat = document.getElementById("Boat");
const svg = document.getElementById("Clipping_Mask").children[1];
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

document.getElementById("Sun").addEventListener("click", () => {
    const duplicateBoat = boat.cloneNode(true);
    svg.insertBefore(duplicateBoat , boat.nextSibling);
    duplicateBoat.style.transform = `translateY(`+ getRandomInt(-20, 120) +`px)`;
    setTimeout(()=>{
        duplicateBoat.classList.add("translated");
    }, 100);
    setTimeout(()=>{
        duplicateBoat.remove();
    }, 20000);
    document.addEventListener('mousemove', handleMouseMove);
});

//Light magnet
const clippingmaskcontainer = document.getElementById("Clipping_Mask");
const center = document.getElementById("light_center");
const hand = document.getElementById("Light");
function setLightCenter() {
    hand.style.transform = "rotate( 0deg)";
    var bbox = document.getElementById("Lighthouse").getBoundingClientRect();
    center.style.top = "calc("+ bbox.top + "px + 5.6vw )";
    center.style.left = "calc(" + bbox.left + "px + 1.2vw )";
};
function resetAnimation() {
    hand.style.transform = "rotate( 0deg)";
    hand.style.animation = "rotate 10s linear infinite";
}
setLightCenter();
resetAnimation();
window.addEventListener('resize', setLightCenter);
function handleMouseMove(event) {
    if (!clippingmaskcontainer.contains(event.target)) {
        resetAnimation();
    } else {
        hand.style.animation = "none";

        const rect = center.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const cursorX = event.clientX;
        const cursorY = event.clientY;
        /* const distance = Math.sqrt((cursorX - centerX) ** 2 + (cursorY - centerY) ** 2); */
        
        const angle = ( Math.atan2(cursorY - centerY, cursorX - centerX) * 180 / Math.PI ) + 1;
        hand.style.transform = "rotate(" + angle + "deg)";
    }
}