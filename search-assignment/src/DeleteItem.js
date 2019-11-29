import React, { Component } from "react";
import crossdelete from './crossdelete.jpg';
import './App.css'

class DeleteItem extends Component {
  render() {
    return (
        <article className='deleteitem'>
         <ul>
             <li className='searchitem'> {this.props.searchitem} 
             <img src={crossdelete} className='image' alt='crossicon'
              onClick={() => this.props.onDelete(this.props.searchitem)}/>
              </li>
              </ul>
        </article>
    );
  }
}
export default DeleteItem;