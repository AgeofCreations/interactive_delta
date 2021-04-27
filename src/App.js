import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, CircleMarker, Circle, Polyline, Polygon, Rectangle, ImageOverlay,
Tooltip } from 'react-leaflet'
import {useState, useEffect} from 'react'

function ClickedCoords() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng)
    }
  })
  return position === null ? null : (
    <Marker position={position}>
      <Popup>You clicked the map at {position.toString()}</Popup>
    </Marker>
  )
}


function GeneratePolygons() {
  const [data,setData]=useState([]);
  const getData=()=>{
    fetch('polygons.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson.items)
      });
  }
  useEffect(()=>{
    getData()
  },[])
  const purpleOptions = { color: 'purple' }
  const result = data.map((item) => <li>{Object.keys(item)[0]}</li>)
  console.log(result)
  return (
    data && data.length>0 && data.map((item)=>
    <Polygon key={Object.keys(item)[0]} pathOptions={{color: item.color}} positions={item[Object.keys(item)[0]]}> 
    <Tooltip>{Object.keys(item)[0]}</Tooltip>
  </Polygon>)
  )
}

function Map() {
  const center = [-9.0804, 42.330322]

const polyline = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]

const multiPolyline = [
  [
    [51.5, -0.1],
    [51.5, -0.12],
    [51.52, -0.12],
  ],
  [
    [51.5, -0.05],
    [51.5, -0.06],
    [51.52, -0.06],
  ],
]

// const polygon = [
//   [56.27, 13.3],
//   [56.255557, 3.88916],
//   [53.826597, 3.933105],
//   [53.826597, 13.3],
// ]

// const multiPolygon = [
//   [
//     [53.1, 3.94186],
//     [53.1, 13.39],
//     [50.4, 13.39],
//     [50.4, 3.963833],
//   ],
//   [
//     [51.51, -0.05],
//     [51.51, -0.07],
//     [51.53, -0.07],
//   ],
// ]

const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]

const fillBlueOptions = { fillColor: 'blue' }
const blackOptions = { color: 'black' }
const limeOptions = { color: 'lime' }
const purpleOptions = { color: 'purple' }
const redOptions = { color: 'red' }

return (
  <MapContainer bounds={[-200, -200], [200, 200]} center={center} zoom={3} scrollWheelZoom={true} style={{'height': 1000}} maxZoom={7} minZoom={3}>
    <ImageOverlay
      bounds={[
        [-200, -200],
        [200,200]
      ]}
      url="Test.png"
      opacity={1}
      zIndex={0}
    />
    <ClickedCoords />
    <GeneratePolygons></GeneratePolygons>
  </MapContainer>
)
}

function App() {
  return (
    <Map />
  );
}

export default App;
