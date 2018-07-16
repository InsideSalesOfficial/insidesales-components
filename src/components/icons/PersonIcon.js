import React from 'react';

const PersonIcon = props => (
  <svg {...props.size || { width: '24px', height: '24px' }} viewBox="0 0 24 24">
    {props.title && <title>{props.title}</title>}
    <path fill={props.fill || '#999999'} d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
  </svg>
);

export default PersonIcon;
