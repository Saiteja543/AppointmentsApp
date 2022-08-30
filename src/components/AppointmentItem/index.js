// Write your code here
import './index.css'

const AppointmentsItem = props => {
  const {eachAppointmentDetails, toggleIsStarred} = props

  const {id, title, date, isStarred} = eachAppointmentDetails

  const onClickStarBtn = () => {
    toggleIsStarred(id)
  }

  const starredImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="appointment-container">
        <p className="title-name">{title}</p>
        <button
          type="button"
          onClick={onClickStarBtn}
          testid="star"
          className="star-button"
        >
          <img src={starredImgUrl} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentsItem
