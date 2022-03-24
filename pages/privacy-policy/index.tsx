import PropTypes from 'prop-types'

const PrivacyPolicy = (props:object = {}) => {
  return (
    <>
      <div>PrivacyPolicy</div>
      <p>{props}</p>
    </>
  )
}

PrivacyPolicy.propTypes = {
  props: PropTypes.object
}

export default PrivacyPolicy