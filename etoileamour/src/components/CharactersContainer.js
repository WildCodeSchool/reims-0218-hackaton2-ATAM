import React, { Component } from 'react'
import { Container, Button } from 'reactstrap';
import ListCharacters from './ListCharacters'

class CharactersContainer extends Component {

    constructor() {
        super()
        this.state = {
            loading: true,
            colLeft: [],
            colRight: [],
            persoLeft: [],
            persoRight: []
        }
        this.randomCharacters = this.randomCharacters.bind(this)
    }

    randomCharacters() {
      console.log("on clique sur le bouton")
      const leftColumn = Math.round(Math.random() * this.state.colLeft.length)
      const rightColumn = Math.round(Math.random() * this.state.colRight.length + this.state.colRight.length)
      console.log(leftColumn)
      console.log(rightColumn)
      console.log(this.state.colLeft.forEach((user) => {
        if (user.id === leftColumn) {
          this.setState({
            persoLeft: user
          })
        }
      }))
      console.log(this.state.colRight.forEach((user) => {
        if (user.id === rightColumn) {
          this.setState({
            persoRight: user
          })
        }
      }))
    }

    render() {
        return <Container>
          <ListCharacters characters={this.state.colLeft}/>
           <ListCharacters characters={this.state.colRight}/>
          <Button onClick={this.randomCharacters}> Coucou la famille </Button>
      </Container>
    }

    componentDidMount() {
        console.log('characters did mount')
        const url = 'https://cdn.rawgit.com/akabab/starwars-api/0.2.1/api/all.json'
        fetch(url)
        .then(res => res.json())
        .then(characters => {
            const colLeft = characters.filter(character => character.id <= 44)
            const colRight = characters.filter(character => character.id > 44)
            this.setState({
              colLeft,
              colRight
            })
        })
    }
}

export default CharactersContainer
