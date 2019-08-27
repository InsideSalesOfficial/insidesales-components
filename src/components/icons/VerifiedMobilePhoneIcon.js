import React from 'react';

const VerifiedMobilePhoneIcon = props => (
  <svg {...props.size || { width: '24px', height: '24px' }} {...props} viewBox="0 0 24 24" fill="currentColor">
    {props.title && <title>{props.title}</title>}
    <path d="M9.5,22 C10.33,22 11,21.33 11,20.5 C11,19.67 10.33,19 9.5,19 C8.67,19 8,19.67 8,20.5 C8,21.33 8.67,22 9.5,22 Z M10.398,18 C11.014,20.048 12.311,21.832 13.997,22.95 C13.836,22.982 13.67,23 13.5,23 L5.5,23 C4.12,23 3,21.88 3,20.5 L3,3.5 C3,2.12 4.12,1 5.5,1 L13.5,1 C14.88,1 16,2.12 16,3.5 L16,8.129 L14,9.055 L14,4 L5,4 L5,18 L10.398,18 Z M14.667,19 L16,17.727 L20,13.904 L19.06,13 L16,15.924 L14.667,17.197 L14,16.562 L12.94,15.554 L12.079,16.377 C12.087,16.436 12.094,16.493 12.104,16.552 L13.62,18 L14.667,19 Z M16.5,9 L22,11.545 L22,15.363 C22,18.896 19.653,22.198 16.5,23 C15.999,22.873 15.522,22.676 15.068,22.432 C13.397,21.532 12.085,19.908 11.44,18 C11.157,17.162 11,16.271 11,15.363 L11,11.545 L14,10.157 L16,9.231 L16.5,9 Z" ></path>
  </svg>
);

export default VerifiedMobilePhoneIcon;