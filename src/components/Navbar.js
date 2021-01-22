import axios from 'axios';
import React from 'react';


class Navbar extends React.Component {
    constructor(props){
        super(props);
        // this.state={
        //     search_keyword:''
        // }
    }
    
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios.get(`https://pokeapi.co/api/v2/${this.state.search_keyword}`).then((data)=>{
    //         console.log(data)
    //     })
    // }
    // handleChange = (e) => {
    //     this.setState({
    //         search_keyword:e.target.value
    //     })
    // }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Pokémon</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex ml-auto" onSubmit={this.props.handleSubmit}>
              <input
                className="form-control mr-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onClick={this.props.handleClick}
                onBlur={this.props.handleBlur}
                onChange={this.props.handleChange}
                value={this.props.value}
                />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}
export default Navbar
