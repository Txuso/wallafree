import './menu-item.component.scss';

import React from 'react';
import { withRouter } from 'react-router-dom';

const MenuItem = ({ name, imageUrl, size, history, linkUrl, match }) => (
	<div
		className={`${size} menu-item`}
		onClick={() => history.push(`${match.url}${linkUrl}`)}
	>
		<div
			style={{ backgroundImage: `url(${imageUrl})` }}
			className="background-image"
		>
			{' '}
		</div>
		<div className="content">
			<h1 className="title">{name.toUpperCase()}</h1>
			<span className="subtitle">CONTACT ME</span>
		</div>
	</div>
);

export default withRouter(MenuItem);
