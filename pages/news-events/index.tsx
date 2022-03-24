import PropTypes from 'prop-types'

const NewsEvents = (props:object = {}) => {
  return (
    <>
      <div>NewsEvents</div>
      <p>{props}</p>
    </>
  )
}

NewsEvents.propTypes = {
  props: PropTypes.object
}

export default NewsEvents