
var pointer = document.getElementById("pointer");
var pos = [10,10]
var bottomleft = [39.128750, -84.520639]
var topright = [39.135333, -84.510944]
var currentcoords = [0,0]
var rigged = false


function showPosition(position) {
  if (!rigged) {
    currentcoords = [position.coords.latitude,position.coords.longitude]
  } else {
    currentcoords = [39.135333, -84.520639];
  }
} 

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    // x.innerHTML = "Geolocation is not supported by this browser.";
  }
}


function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function Main() {
    while(true) {
      getLocation()
      // currentcoords - topright / (bottom left - top right)
      let temp = [];
      for (let i in currentcoords) {
        temp[i] = (1 -i*2) * (((1-i)*100) - ((currentcoords[i] - topright[i]) / (bottomleft[i] - topright[i]) * 100 ));
        pos[i] = temp[i];
        console.log(currentcoords)
        console.log(((currentcoords[i] - topright[i]) / (bottomleft[i] - topright[i]) * 100 ))
      }
      console.log(temp);
        // Move to Point
      pointer.style.left = (pos[0])+'%'
      pointer.style.top = (pos[1])+'%'
        // console.log('ahh')

      await sleep(3000)
    }
}
getLocation()
console.log(navigator.geolocation)
Main()