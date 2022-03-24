import PropTypes from 'prop-types'

const Publications = (props:object = {}) => {
  return (
    <>
      <div>Publications</div>
      <p>{props}</p>
    </>
  )
}

Publications.propTypes = {
  props: PropTypes.object
}

export default Publications