import React from 'react';

const PauseOutlined = props => (
	<svg
		{...props.size || { width: "24px", height: "24px" }}
		{...props}
		viewBox="0 0 24 24"
	>
		{props.title && <title>{props.title}</title>}
		<defs>
			<path
				d="M9,16 L11,16 L11,8 L9,8 L9,16 Z M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,20 C7.59,20 4,16.41 4,12 C4,7.59 7.59,4 12,4 C16.41,4 20,7.59 20,12 C20,16.41 16.41,20 12,20 Z M13,16 L15,16 L15,8 L13,8 L13,16 Z"
				id="path-1"
			/>
		</defs>
		<g
			stroke="none"
			strokeWidth="1"
			fillRule="evenodd"
		>
			<mask id="mask-2" fill="white">
				<use xlinkHref="#path-1" />
			</mask>
			<use id="Combined-Shape" xlinkHref="#path-1" />
		</g>
	</svg>
);

export default PauseOutlined;
