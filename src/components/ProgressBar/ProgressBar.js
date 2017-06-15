import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({percent, width, height}) => {
  const getColor = (percent) => {
    if (percent === 100) return 'green';
    return percent > 50 ? 'lightgreen' : 'red';
  }

  const getWidthAsPercentOfTotalWidth = () => {
    return parseInt(width * (percent / 100), 10);
  }

  return (
    <div style={{border: 'solid 1px lightgray', width: width}}>
      <div style={{
        width: getWidthAsPercentOfTotalWidth(),
        height,
        backgroundColor: getColor(percent)
      }} />
    </div>
  );
}

ProgressBar.propTypes = {
  /** Percent of progress completed */
  percent: PropTypes.number.isRequired,

  /** Bar width */
  width: PropTypes.number.isRequired,

  /** Bar height */
  height: PropTypes.number
};

ProgressBar.defaultProps = {
  height: 5
};

export default ProgressBar;