import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { Link } from 'react-router-dom'
// import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { readEvents } from '../actions';

class EventsIndex extends Component {
  componentDidMount() {
    this.props.readEvents()
  }

  renderEvents() {
    return _.map(this.props.events, event => (
      <TableRow key={event.id}>
        <TableCell>{event.id}</TableCell>
        <TableCell>
          <Link to={`events/${event.id}`}>
            {event.title}
          </Link>
        </TableCell>
        <TableCell>{event.body}</TableCell>
      </TableRow>
    ))
  }

  render() {
    const LinkToNew = React.forwardRef((props, ref) => (
			<Link ref={ref} to="/events/new/" {...props} />
    ))
    const style = {
      position: 'absolute',
      bottom: 0,
      right: 0
    }
    return (
      <React.Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { this.renderEvents() }
          </TableBody>
        </Table>

        <Fab color="primary" aria-label="add" component={LinkToNew} style={style}>
          <AddIcon />
        </Fab>
        {/* <Link to="/events/new">New</Link> */}
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({ events: state.events })
// const mapDispatchToProps = dispatch => ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement()),
// })

const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
