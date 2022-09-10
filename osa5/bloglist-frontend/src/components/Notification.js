import PropTypes from 'prop-types'
const Notification = ({ message }) => {

	if(message.msg === null){
		return null
	}
	else if(message.state){
		return(
			<div className="resolved">
				{message.msg}
			</div>
		)
	}
	else{
		return(
			<div className="rejected">
				{message.msg}
			</div>
		)
	}
}

Notification.propTypes = {
	message : PropTypes.object.isRequired
}

export default Notification