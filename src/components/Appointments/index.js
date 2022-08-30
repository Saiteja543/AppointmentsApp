// Write your code here
import {Component} from 'react'

import {format} from 'date-fns'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickedFilerButton = () => {
    const {isFilterActive} = this.state

    this.setState({isFilterActive: !isFilterActive})
  }

  onChangeGivenTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeGivenDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onSubmitGivenData = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentList = this.getFilteredAppointmentList()
    return (
      <div className="app-container">
        <div className="container">
          <div className="appointments-container">
            <div className="sub-container">
              <form className="form" onSubmit={this.onSubmitGivenData}>
                <h1 className="heading">Add Appointments</h1>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  onChange={this.onChangeGivenTitle}
                  className="input"
                  value={titleInput}
                />
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  className="input"
                  id="date"
                  onChange={this.onChangeGivenDate}
                  value={dateInput}
                />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
            <hr className="hr" />
            <div className="appointment-and-starred-btn-container">
              <h1 className="appointment-heading">Appointments</h1>
              <button
                className={`starred-btn ${filterClassName}`}
                type="button"
                onClick={this.onClickedFilerButton}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-lists-container">
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  eachAppointmentDetails={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
