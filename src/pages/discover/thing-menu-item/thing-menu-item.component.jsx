import './thing-menu-item.component.scss';

import Logo from '../../../assets/send-message.png';
import React from 'react';
import { withRouter } from 'react-router-dom';

const ThingMenuItem = ({ thing, onClick }) => (
	<div className={`thing-menu`}>
		<div
			style={{ backgroundImage: `url(${thing.imageUrl})` }}
			className="background-image"
		>
			<div className="logo-wrapper" onClick={() => onClick(thing)}>
				<img src={Logo} className="logo" alt="" />
			</div>
		</div>
		<div className="information-content">
			<span>{thing.name}</span>
		</div>
	</div>
);

export default withRouter(ThingMenuItem);
