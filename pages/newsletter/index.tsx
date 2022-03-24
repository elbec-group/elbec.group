import PropTypes from 'prop-types'

const Newsletter = (props:object = {}) => {
  return (
    <>
      <div>Newsletter</div>
      <p>{props}</p>
    </>
  )
}

Newsletter.propTypes = {
  props: PropTypes.object
}

export default Newsletter