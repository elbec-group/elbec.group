import PropTypes from 'prop-types'

const About = (props:object = {}) => {
  return (
    <>
      <div>About</div>
      <p>{props}</p>
    </>
  )
}

About.propTypes = {
  props: PropTypes.object
}

export default About