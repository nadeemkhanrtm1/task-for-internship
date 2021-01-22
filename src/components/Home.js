import React from 'react';
import Navbar from './Navbar';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonData: [],
      reload:true,
      search_keyword:'',
      displayNone:true,
      displayLoading:false,
      displayCard:false,
      searchDataPok:[{
          images:'',
          name:''
      }]
    }
    if (window.performance) {
        if (performance.navigation.type == 1) {
          this.onUnload();
        } else {
          alert( "This page is not reloaded");
        }
      }
  }

  onUnload(event) { 
    this.setState({
        reload:false
    })
  }
  componentDidMount = () => {

      if(this.state.reload){
        axios
        .get(`https://pokeapi.co/api/v2/pokemon`)
        .then(data => {
          data
            .data
            .results
            .map((pokemon, index) => {
              axios
                .get(pokemon.url)
                .then((data) => {
                    const pokemonRawData={
                        name: data.data.name,
                        images:data.data.sprites.front_default,
                        url:data.config.url
                    }
                  this.setState({
                      pokemonData:[...this.state.pokemonData,pokemonRawData]
                  })
                })
                .catch(err => console.log(err))
            })
        })
        .catch(err => console.log(err))
      }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.search_keyword}`).then((data)=>{
        const Data = {
            name: data.data.name,
            images:data.data.sprites.front_default,
        }
        this.setState({
            searchDataPok:[Data]
        })
    })
    this.setState({
        displayNone:false,
        displayLoading:false,
        displayCard:true
    })
}
handleChange = (e) => {
    if(e.target.value === ''){
        this.setState({
            displayNone:true,
            search_keyword:'',
            displayCard:false
        })
    }
    else{
    this.setState({
        search_keyword:e.target.value,
        displayNone:false,
        displayLoading:true
    })}
}

handleBlur = (e) => {
this.setState({
    displayNone:true,
    displayLoading:false,
    displayCard:false
})
}
handleClick = (e) => {
    if(e.target.value === ""){
        this.setState({
            displayNone:true
        })
    }else{
        this.setState({
            displayNone:false,
        displayLoading:true,
        displayCard:false
        })
    }
}

  render() {
      console.log(this.state.searchDataPok)
    return (
      <div className="container-fluid">
        <Navbar handleClick={this.handleClick} handleBlur={this.handleBlur} handleChange={this.handleChange} handleSubmit={this.handleSubmit} value={this.state.search_keyword}/>
        <h1 className="text-center">Home Page</h1>
        {
            this.state.displayNone ? <div className="container">
            <div className="row text-center mx-auto">
            { this.state.pokemonData.map((data)=>
            (<div className="col-lg-4 col-sm-12">
                 <div class="card" style={{width:'18rem'}}>
                 <img src={data.images} class="card-img-top" alt="..."/>
                 <div class="card-body">
                   <h5 class="card-title">{data.name}</h5>
                   <a href={data.url} class="btn btn-primary">Details</a>
                 </div>
               </div>
               </div>
            ))}
            
            </div>
            </div> 
            : null
        }
        {
           this.state.displayLoading ? <h1>Loading... Click on Submit Button</h1> : null
        }
        {
            this.state.displayCard ? <div className="col-lg-4 col-sm-12">
            <div class="card" style={{width:'18rem'}}>
            <img src={this.state.searchDataPok[0].images} class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title text-center">{this.state.searchDataPok[0].name}</h5>
            </div>
          </div>
          </div> : null
        }
      </div>
    )
  }
}

export default Home
