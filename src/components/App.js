import React, { Component } from 'react'
import { Form, FormControl, Button } from 'react-bootstrap'
import Note from './Note'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'

const cookie_key = 'NOTES'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			notes: [],
			isComplete: false
		}
	}

	// component did mount= .fires when component finishes loading or mounting onto the app. refers to when the application component loads to the DOM of the application
	componentDidMount() {
		this.setState({ notes: read_cookie(cookie_key) })
	}

	submit() {
		if(this.state.text){
			const { notes, text } = this.state
			// when key and value are the same you can eliminate key or value so you only have one word inside object. for ex the shorthand for newNote = {text:text} is written below. same for setState object with notes
			notes.push({ text })
			this.setState({ notes })
			bake_cookie(cookie_key, this.state.notes)
			this.setState({ text: '' })
		}	
	}

	clear() {
		delete_cookie(cookie_key)
		this.setState({ notes: [] })
	}

	render() { 
		return (
			<div>
				<h2>Note to Self</h2>
				<Form inline>
					{/* console.log event.targe t.value to see what is being passed as event 
                    Control onChange={event =>{console.log(event.target.value)}} /> */}
					<FormControl value={this.state.text} onChange={event => { this.setState({ text: event.target.value }) }} />
					{'  '}

					<Button onClick={() => this.submit()}>Submit</Button>
				</Form>
				{/* {
					this.state.notes.map(note => {
						return (
							<div>{note.text}</div>
						)
					})
				} */}
				{this.state.notes.map((note, index) => {
					console.log(<Note note={note} key={index}/>)
					return (
						<div>
							<Note note={note} key={index} isComplete={this.state.isComplete} />
							{console.log(this.notes)}
	
						<Button onClick={() => this.clear()} >Clear NOTES</Button>
						</div>	

					)	
				})
				}
				<hr />
				<Button onClick={()=>this.clear()} >Clear NOTES</Button>
				
			</div>
		)
	}
}

export default App