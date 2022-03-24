import PropTypes from 'prop-types'

const Contact = (props: object = {}) => {
  return (
    <>
      <div>Contact</div>
      <p>{props}</p>
    </>
  )
}

Contact.propTypes = {
  props: PropTypes.object
}

export default Contact
