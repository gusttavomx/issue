import React, { Component } from 'react'
import '../Scss/Restaurants.scss'


class PostList extends Component {
  render() {

    let {Restaurants} = this.props

    return (
      <div className="container app d-flex flex-wrap">
        {
          Restaurants.length===0? <div className="restaurants-msg col-12 d-flex justify-content-center">Não foram encontrados restaurantes.</div>:
          Restaurants.map((postDetail,index) => {
          return ( 
            <div key={index} className="restaurant animation slow fadeIn p-3 col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 d-flex flex-column">
              <div className="box p-3 d-flex justify-content-start align-items-center">
                <div className="col-4 p-0 restaurant-img" style={{backgroundImage: `linear-gradient(to top, transparent 0%, rgba(39, 25, 21, .5) 70%), url(${postDetail.imageCoverUrl})`}}>
                  <span className="badge badge-pill badge-primary">{(postDetail.hasOwnProperty("distance"))?postDetail.distance+" km":null}</span>
                </div>
                <div className="restaurant-info col-8 p-0 ml-2">
                  <h6>{postDetail.name}</h6>
                  <p>{postDetail.cooking}</p>
                  <p className="d-flex align-items-center">{postDetail.city} <i className="fas fa-circle icon-mini"></i> <span> {postDetail.district}</span></p>
                </div>
              </div>
            </div>
          )
        }
        )}
      </div>
    )
  }
}

class Restaurants extends Component {
  render() {
    return (
      <PostList Restaurants={this.props.Restaurants}/>
    );
  }
}

export default Restaurants;