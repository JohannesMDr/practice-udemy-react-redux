import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { MemoryRouter as Router } from 'react-router';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { postEvent } from '../actions';

class EventsNew extends Component {
	constructor(props) {
		super(props)
		this.onSubmit = this.onSubmit.bind(this)
	}
	renderField(field) {
		const { input, label, type, meta: { touched, error } } = field
		return (
			<TextField
				label={label}
				type={type}
				helperText={touched && error}
				{...input}
				fullWidth={true}
			/>
		)
	}

	async onSubmit(values) {
		await this.props.postEvent(values)
		this.props.history.push('/')
	}

  render() {
		const { handleSubmit, pristine, submitting, invalid } = this.props
		const style = { margin: 12 }
		const LinkToToppage = React.forwardRef((props, ref) => (
			<Link ref={ref} to="/" {...props} />
		))
    return (
			// <Router>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
					<div><Field label="Body" name="body" type="text" component={this.renderField} /></div>

					<Button variant="contained" label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid } >submit</Button>
					<Button variant="contained" style={style} component={LinkToToppage}>cancel</Button>
				</form>
			// </Router>
    )
  }
}

const validate = values => {
	const errors = {}

	if (!values.title) errors.title = "Enter a title, please"
	if (!values.body) errors.body = "Enter a body, please"

	return errors
}

const mapDispatchToProps = ({ postEvent })

export default connect(null, mapDispatchToProps)(
	reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
)
