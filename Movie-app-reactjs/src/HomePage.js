import React, {Component} from 'react';
import {observer} from "mobx-react"
import {Switch, Route} from "react-router-dom"
import Home from "./components/Home"
import Movie from "./components/Movie"
import "./styles/main.scss"
import movieStore from "./store/movie"



const HomePage = observer(class extends Component {
  componentDidMount() {
    console.log("Pop", this.props.store.popular)
    this.props.store.fetchPopular(this.props.store.currentPage)
  }

  handleInput = (e) => {
    let term = this.props.store.term = e.target.value
    if(term === 0) {
      this.props.store.fetchPopular(this.props.store.currentPage)
    } else {
      this.props.store.fetchSearch(term, this.props.store.currentPage)
    }
  }

  changePage = (e) => {
    this.props.store.currentPage = e
    console.log("page", e)
    if(this.props.store.term.length === 0) {
      this.props.store.fetchPopular(this.props.store.currentPage)
    } else {
      this.props.store.fetchSearch(this.props.store.term, this.props.store.currentPage)
    }
    this.scrollTop()
  }

 

  scrollTop = () => {
    window.scrollTo(0, 0)
  }

  render() {
    const {popular, searchResults, loaded, term} = this.props.store
    const { credits } = movieStore
    
   
    return (
      <div className="relative">
        
        <Switch>
          <Route exact path="/">
          <div className="title"><h1>Popular Movie</h1></div>
            <Home 
            changePage={this.changePage}
            handleInput={this.handleInput}
            term={this.props.store.term}
            scrollTop={this.scrollTop}
            />
             
          </Route>
        </Switch>

        <Switch>
         
          {!loaded ? null : !term ? 
          popular.results.map(i => <Route
          path={`/movie/${i.id}`} 
          key={i.id}>
            <Movie id={i.id} 
            scrollTop={this.scrollTop} />
          </Route>) :
          searchResults.results.map(i => <Route
          path={`/movie/${i.id}`} key={i.id}>
            <Movie id={i.id} 
            scrollTop={this.scrollTop}/>
            </Route>)}
        </Switch>

        
      </div>
    )
  }
})


export default HomePage