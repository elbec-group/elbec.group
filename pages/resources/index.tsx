import PropTypes from 'prop-types'

const Resources = (props:object = {}) => {
  return (
    <>
      <div>Resources</div>
      <p>{props}</p>
    </>
  )
}

Resources.propTypes = {
  props: PropTypes.object
}

export default Resources