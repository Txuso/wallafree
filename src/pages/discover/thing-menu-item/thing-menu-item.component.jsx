import './thing-menu-item.component.scss';

import React from 'react';
import { withRouter } from 'react-router-dom';

const ThingMenuItem = ({ history, thing, match, linkUrl }) => (
	<div
		className={`thing-menu`}
		onClick={() => history.push(`${match.url}${linkUrl}`)}
	>
		<div
			style={{ backgroundImage: `url(${thing.imageUrl})` }}
			className="background-image"
		>
			{' '}
		</div>
		<div className="information-content">
			<span>{thing.name}</span>
		</div>
	</div>
);

export default withRouter(ThingMenuItem);
