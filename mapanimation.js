
mapboxgl.accessToken = 'pk.eyJ1IjoiZGlsa3NqIiwiYSI6ImNsMWNhMHZwcjAxOWYza3M0OHM0Yjl6emUifQ.3MTObnLjYpr0sZFt83VoHA'

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.104081, 42.3655541],
  zoom: 12
});

var marker = new mapboxgl.Marker()
	.setLngLat([-0, 0])
  	.addTo(map);

const busStops = getBusLocations

var counter = 0;
  function move(){
    setTimeout(() =>{
      if (counter >= busStops.length) return;
      marker.setLngLat(busStops[counter]);
      counter++;
      move();
    }, 1000);
  }

async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);
	const bus = locations[0];

	marker.setLngLat([bus.attributes.longitude, bus.attributes.latitude])

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}
