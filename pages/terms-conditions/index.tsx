import PropTypes from 'prop-types'

const TermsConditions = (props:object = {}) => {
  return (
    <>
      <div>TermsConditions</div>
      <p>{props}</p>
    </>
  )
}

TermsConditions.propTypes = {
  props: PropTypes.object
}

export default TermsConditions