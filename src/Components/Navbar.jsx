import React, { Component } from 'react'
import '../Scss/Navbar.scss'

class FoodList extends Component {
  
  render() {
      return (
        <div className="food-list d-flex align-items-center">
        {this.props.arrayCooking.map((postDetail, index) => {
          return ( 
            <button 
            key={index}
            onClick={(e)=>this.props.handleChange(e, postDetail)}
            id="cooking" 
            className={this.props.cooking===postDetail?"btn btn-no-bg btn-cooking active":"btn btn-no-bg btn-cooking"}>{postDetail}</button>
            )
          }
        )}
      </div>
    )
  }
}

class Navbar extends Component {
  
  constructor( props ) {
    super( props )
    this.state = { show : false };
    
    this.toggleDiv = this.toggleDiv.bind(this)
  }
  

  toggleDiv = () => {
    const { show } = this.state;
    this.setState( { show : !show } )
  }

  render() {
    let {arrayCity,
      arrayCooking,
      arrayDistricts,
      handleChange,
      city,
      district,
      cooking,
      sortBy,
      setRestaurants} = this.props

    return (
      <div className="navbar p-0 animation fadeInDown">
        <div className="navbar-area container mt-1 d-flex flex-column align-items-start p-0">
          <div className="search-area col-12 d-flex justify-content-between align-items-center">
            <div className="logo">
              <img src={require('../Images/logo.png')} alt="logo" />
            </div>
            <div className="search d-flex justify-content-end align-items-baseline p-2 mt-3" onClick={ this.toggleDiv }>
              <p></p>
              <i className="nav-search fas fa-search ml-3 icon-sm"></i>
            </div>
          </div>
          { this.state.show && <RestaurantFinder 
                            city={city}
                            district={district}
                            cooking={cooking}
                            handleChange={handleChange}
                            sortBy={sortBy}
                            arrayCity={arrayCity} 
                            arrayCooking={arrayCooking} 
                            arrayDistricts={arrayDistricts}
                            setRestaurants={setRestaurants}
                            toggleDiv={this.toggleDiv}/> }
        </div>
      </div>
    );
  }
}

class RestaurantFinder extends Component {
  constructor( props ) {
    super( props )
    this.state = { 
      show : false,
    };
    
    this.toggleDiv = this.toggleDiv.bind(this)
  }
  

  toggleDiv = () => {
    const { show } = this.state;
    this.setState( { show : !show } )
  }
  render() {
    let {arrayCity, 
      arrayCooking, 
      arrayDistricts,
      city,
      district,
      cooking,
      sortBy,
      handleChange,
      setRestaurants,
      toggleDiv} = this.props
    return(
      <>
      <div className="localization col-12 animation fadeInDown mb-4 pb-4">
        <p className="mt-4 mb-0 text-white">Você está em</p>
        <h5 className="mb-0">{city}</h5>
        <p className="text-custom">Bairro: {district}</p>
        <div className="d-flex flex-row justify-content-start">
          <button className="btn btn-custom-grey" onClick={ this.toggleDiv }>Alterar localização</button>
          <button 
          onClick={()=>{
            sortBy("distance")
            toggleDiv()
          }}
          className="btn btn-custom-yellow ml-2"><i className="fas fa-map-marker"></i></button>
        </div>
        { this.state.show && <Location 
                              city={city}
                              district={district}
                              handleChange={handleChange} 
                              arrayCity={arrayCity} 
                              arrayDistricts={arrayDistricts}/> }
      </div>
      <div className="filter col-12 animation fadeInDown mb-0 pb-3">
        <h5 className="d-flex justify-content-between">Filtrar restaurantes <span><i className="fas fa-chevron-right animation fadeInLeft"></i></span></h5>
          <FoodList arrayCooking={arrayCooking} cooking={cooking} handleChange={handleChange}/>
      </div>
        <div className="bottom animation fadeInDown col-12 d-flex flex-column align-items-center">
          <button 
          onClick={()=>{
            toggleDiv()
            setRestaurants()
          }}
          className="btn btn-custom-grey mt-3 mb-2 col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2 mb-3">Aplicar filtros</button>
        </div>
      </>
    )
  }
}

class Location extends Component {
  constructor( props ) {
    super( props )
    this.state = { show : false };
    
    this.toggleDiv = this.toggleDiv.bind(this)
  }
  

  toggleDiv = () => {
    const { show } = this.state;
    this.setState( { show : !show } )
  }
  render() {
    return(
      <>
      <div className="location animation fadeInDown d-flex flex-wrap">
        <div className="select-city mt-4 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0">
        <select  className="custom-select"
        id="city"
        value={this.props.city}
        onChange={(e)=>this.props.handleChange(e)}>
        {this.props.arrayCity.map((item,index)=> <option key={index}>{item}</option>)}
        </select>
        </div>
        <div className="select-district mt-4 col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 p-0">
        <select className="custom-select"
          id="district"
          value={this.props.district}
          onChange={(e)=>this.props.handleChange(e)}>
          {this.props.arrayDistricts.map((item)=> {
            if(item.city === this.props.city){
              return item.districts.map((item,index)=><option key={index}>{item}</option>)
            }
            return null
          })}
        </select>
        </div>
      </div>
    </>
      )
  }
}

export default Navbar;