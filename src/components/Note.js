import React, { Component } from 'react'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'

const cookie_key = 'CHECKED'


class Note extends Component {
    constructor() {
        super()
        this.state = {
            isComplete: false
        }
    }
    componentDidMount() {
		this.setState({ isComplete: read_cookie(cookie_key) })
	}



    handleInputChange(event) {
        console.log(event.target.checked)
        event.target.type === 'checkbox' ? event.target.checked : event.target.value
        event.target.value
        this.setState({ isComplete: true })
        bake_cookie(cookie_key, this.props.isComplete)
        
        console.log(this.props.isComplete)
    }

//     handleInputChange = ({ target: { event }}) => {
//         console.log(event)
//   }
// onChange={event => { this.setState({ text: event.target.value }) }} />
// {'  '}

    render() {
        return (
            <div className="note">
                <p>{this.props.note.text} </p>
                <form onClick={() => this.handleInputChange }>
                    <input type='checkbox' name='status' checked={this.props.isComplete} onChange={event=>{console.log(this.props.isComplete),this.handleInputChange}} />
                </form>
                <button>Delete</button>
            </div>
        )
    }
}

export default Note