import './thing-menu-item.component.scss';

import Logo from '../../../assets/send-message.png';
import React from 'react';
import { withRouter } from 'react-router-dom';

const ThingMenuItem = ({ history, thing, match, linkUrl }) => (
	<div className={`thing-menu`}>
		<div
			style={{ backgroundImage: `url(${thing.imageUrl})` }}
			className="background-image"
		>
			<div className="logo-wrapper" onClick={() => history.push('/chat')}>
				<img src={Logo} className="logo" alt="" />
			</div>
		</div>
		<div className="information-content">
			<span>{thing.name}</span>
		</div>
	</div>
);

export default withRouter(ThingMenuItem);
