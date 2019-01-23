import React, { Component } from 'react'
import Navbar from '../Components/Navbar'
import Restaurants from '../Components/Restaurants';
import Restaurantes from '../Components/jsonDB.js'

class Home extends Component {
  constructor( props ) {
    super( props )
    this.state = { 
      arrayCity:["Belo Horizonte"],
      arrayCooking:["Todos"],
      arrayDistricts:["Todos"],
      city: "Belo Horizonte",
      district: "Todos",
      cooking:"Todos",
      curLon:0,
      curLat:0,
      Restaurants:[],
    };
    
  }
  
  componentDidMount(){
    let arrayCity=Restaurantes.reduce((previousValue, item)=>{
        previousValue.add(item.city)
        return previousValue
    },new Set())
    let arrayCooking=Restaurantes.reduce((previousValue, item)=>{
    previousValue.add(item.cooking)
    return previousValue
    },new Set())        

    arrayCity = new Array(...arrayCity)
    arrayCooking = new Array(...arrayCooking)

    let arrayDistricts=[]
    arrayCity.forEach(item => {
        let districts=new Set()
        Restaurantes.forEach(item2 =>{
            if(item===item2.city) districts.add(item2.district)
        })
        districts = new Array(...districts)
        districts.unshift("Todos")
        arrayDistricts.push({city:item,districts})
    })
    this.sortBy("alpha")
    this.setUserLocation()
    arrayCooking.unshift("Todos")
    this.setState((state, props)=>{
        return {...state, 
            arrayCity, 
            arrayCooking, 
            arrayDistricts,} 
    }
    )
}

setRestaurants = () => {
    this.sortBy("alpha")
}

applyFilter = (data) => {
    
    let Restaurants=data.map((item, index) => {
            
        if(this.state.district!=="Todos"){
            if(this.state.cooking!=="Todos"){
                if(item.city===this.state.city && item.district===this.state.district && item.cooking===this.state.cooking){
                    return item
                }
            }
            else{
                if(item.city===this.state.city && item.district===this.state.district)
                    return item
                }         
        }
        if(this.state.district==="Todos"){
            if(this.state.cooking!=="Todos"){
                if(item.city===this.state.city && item.cooking===this.state.cooking){
                    return item
                }
            }
            else{
                if(item.city===this.state.city) 
                return item
                }
        }
        return null
    })
    Restaurants=Restaurants.filter(item=> item!==null)
    this.setState((state)=>{
        return {...state, 
            Restaurants} 
    }
    )
}

handleChange=(event, cooking)=>{
  
  switch (event.target.id) {
      case "city":
          this.setState({
              ...this.state,
                  city: event.target.value,
              })
              break;

      case "cooking":
          this.setState({
              ...this.state,
              cooking: cooking,
              })
          break;
      case "district":
          this.setState({
              ...this.state,
              district: event.target.value,
              })
          break;
      default:
          break;
  }        
}

setUserLocation = () =>{
  let curLon
  let curLat
  window.navigator.geolocation.getCurrentPosition((pos) => {
      curLon = pos.coords.longitude;
      curLat = pos.coords.latitude;
      this.setState({
          ...this.state,
          curLon,
          curLat
      })
  })
              
}

toRad = (n) => {
  return n * Math.PI / 180;
  }

calculateDistance = (lon1, lat1, lon2, lat2) =>{
  var R = 6371; 
  var dLat = this.toRad(lat2 - lat1)
  var dLon = this.toRad(lon2 - lon1)
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) *
      Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; 
  return d;
}

sortBy = (type) =>{
  let Restaurants=Restaurantes.slice()
  if(type==="distance"){
      
    Restaurants.map((item, index, array) => {   
          let distance
          if(this.state.curLon!==0 && this.state.curLat!==0)
              distance = this.calculateDistance(this.state.curLon,this.state.curLat,item.coordinates.longitude,item.coordinates.latitude)

          array[index].distance=distance.toFixed(1)
          return null
      })

      Restaurants.sort((a, b) => {            
          return a.distance-b.distance
      })
      this.setState((state)=> {
          return{
              ...state,
              cooking:"Todos",
              district:"Todos"
          }
      })
      this.applyFilter(Restaurants)
  }

  if(type==="alpha"){
      
      
    Restaurants.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); 
      var nameB = b.name.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      
      return 0;
    });
    this.applyFilter(Restaurants)
  }
}


  render() {    
    
    let {arrayCity, 
      arrayCooking, 
      arrayDistricts,
      city,
      district,
      cooking,
      } = this.state


    return (
      <div>
          <Navbar arrayCity={arrayCity}
                  arrayCooking={arrayCooking}
                  arrayDistricts={arrayDistricts}
                  city={city}
                  district={district}
                  cooking={cooking}
                  sortBy={this.sortBy}
                  handleChange={this.handleChange}
                  setRestaurants={this.setRestaurants}/>
          <Restaurants Restaurants={this.state.Restaurants}/>
      </div>
    );
  }
}

export default Home;
