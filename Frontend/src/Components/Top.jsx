import PropTypes from 'prop-types';

Top.propTypes = {
  state: PropTypes.bool
}

export default function Top({ state }) {
  return state ? (
    <>
      <br />
      <br />
      <br />
    </>
  ) : null;
}