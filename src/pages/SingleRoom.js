import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../Context";
import StyledHero from "../components/StyledHero";

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    console.log("SINGLE PROPS", this.props.match.params);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg
    };
  }
  static contextType = RoomContext;
  // componentDidMount(){

  // }
  render() {
    const { getRoom } = this.context;
    console.log("CONTEXT", getRoom);
    const room = getRoom(this.state.slug);
    console.log("STATE", this.state);
    console.log("singleroom", room);
    if (!room) {
      return (
        <div className="error">
          <h3>No such room could be found...</h3>
          <Link to="/rooms" className="btn-primary">
            Back to Rooms
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
    } = room;
    const [mainImg,...defaultImg] = images;
    console.log("DEFAULT IMG", defaultImg)
    return (
      <>
      <StyledHero img={mainImg || this.state.defaultBcg}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            Back to Rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">

       {defaultImg.map((item,index) =>{
       return  <img key={index} src={item} alt={name}/>
       })} 
        </div>
        <div className="single-room-info"> 
        <article className="desc">
       <h3>Details</h3>
       <p>{description}</p>
        </article>
        <article className="info">
        <h3>info</h3>
        <h6>Price: ${price}</h6>
        <h6>Size: {size} SQFT</h6>
        <h6>Max capacity: {
          capacity > 1 ? `${capacity} people` :
          `${capacity} person` 
          }</h6>
          <h6>{pets?"Pets Allowed" : "No pets allowed"}</h6>
          <h6>{breakfast && "Free Breakfast Included"}</h6>
          <section className="room-extras">
          <h6>Extras</h6>
          <ul className="extras">
             {extras.map((item,index)=>{
               return <li key={index}>- {item}</li>
             })}
          </ul>
          </section>
        </article>
        </div>
      
      </section>
      </>
    );
  }
}
