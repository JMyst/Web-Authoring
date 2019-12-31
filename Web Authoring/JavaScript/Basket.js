var basketTotal;
basketTotal = 0;

function addSportsCart(){
	basketTotal = basketTotal + 250000;
	document.getElementById("basket-content").innerHTML = "Price total:£" + basketTotal;
    // Store
    localStorage.setItem("basket-content");
    // Retrieve
    document.getElementById("basket-content").innerHTML = localStorage.getItem("basket-content");
}
function addMotorbikeCart(){
	basketTotal = basketTotal + 800000;
	document.getElementById("basket-content").innerHTML = "Price total:£" + basketTotal;
    // Store
    localStorage.setItem("basket-content");
    // Retrieve
    document.getElementById("basket-content").innerHTML = localStorage.getItem("basket-content");
}