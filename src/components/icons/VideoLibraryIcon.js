import React from 'react';

const VideoLibraryIcon = props => (
  <svg {...props.size || { width: '24px', height: '24px' }} {...props} viewBox="0 0 24 24">
    {props.title && <title>{props.title}</title>}
    <g id="Bounding_Boxes">
      <path fill="none" d="M0,0h24v24H0V0z"/>
    </g>
    <g id="Outline">
      <g id="ui_x5F_spec_x5F_header">
      </g>
      <g>
        <g>
          <path d="M4,6H2v14c0,1.1,0.9,2,2,2h14v-2H4V6z"/>
        </g>
        <g>
          <path d="M20,2H8C6.9,2,6,2.9,6,4v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M20,16H8V4h12V16z"/>
        </g>
        <g>
          <polygon points="12,5.5 12,14.5 18,10 "/>
        </g>
      </g>
    </g>
  </svg>
);

export default VideoLibraryIcon;
