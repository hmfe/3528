import React from 'react'
import axios from 'axios'
import DeleteItem from './DeleteItem'

import './App.css'

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      suggestions: [],
      text: '',
      persons: [],
      delvalues: [],
    }
    this.baseState = this.state
  }

  resetForm = () => {
    this.setState(this.baseState)
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons: persons });
      })
  }
  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      suggestions = this.state.persons.map(item => 
        (item.name)).filter(function (val) {
          return val.indexOf(value) > -1
        })
    }
    this.setState(() => ({ suggestions: suggestions, text: value }))
  }

  handleDelete = id => {
    let delvalues = [];
    if (delvalues.length === 0) {
      delvalues = this.state.suggestions.map(item => item)
        .filter(
          person => person !== id
        )
      this.setState(() => ({ suggestions: delvalues }))
      if (this.state.suggestions.length === 1) {
        this.resetForm()
      }
    }
  }
  renderPersons() {
      return (
        <React.Fragment>
          {this.state.suggestions.map(item => (
            <DeleteItem
              key={item}
              searchitem={item}
              onDelete={this.handleDelete}
            />
          ))}
        </React.Fragment>
      )
  }
  render() {
    const { text } = this.state;
    return (<section className='search-field'>
      <button className='delete-button' type='button'>Delete</button>
      <section className='wrapper'>
      <input className='input-field' value={text} onChange={this.onTextChanged} type='text' 
      placeholder='Search...' />
      {/* <img src={crossdelete} className='img-delete' alt='delete' onClick={this.resetForm}/> */}
      {this.renderPersons()}
      </section>
    </section>)
  }
}