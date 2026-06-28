
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
    // currentcoords = [39.135333, -84.520639];
    // currentcoords = [39.128750, -84.510944];
  }
} 

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    // x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
document.getElementById("location-button").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(
        showPosition,
        (err) => console.log(err),
        { enableHighAccuracy: true }
    );
});


function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function Main() {
    while(true) {
      getLocation()
      // currentcoords - topright / (bottom left - top right)
      let temp = [];
      for (let i in currentcoords) {
        // TEST ONE: 160 RIGHT, temp[i] = (1 -i*2) * (((1-i)*100) - ((currentcoords[i] - topright[i]) / (bottomleft[i] - topright[i]) * 100 ));
        temp[i] = ((currentcoords[i] - topright[i]) / (bottomleft[i] - topright[i]) * 100 );
        if (i == 0) {
          temp[i] = 100 - temp[i]
        } else {
          temp[i] = temp[i]
        }
        pos[i] = temp[i];
      }
      console.log(temp);
        // Move to Point
      pointer.style.left = (pos[0])+'%'
      pointer.style.top = (pos[1])+'%'
        // console.log('ahh')

      await sleep(3000)
    }
}
console.log(navigator.geolocation)
