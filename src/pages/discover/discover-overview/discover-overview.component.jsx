import './discover-overview.component.scss';

import React from 'react';
import ThingMenuItem from '../thing-menu-item/thing-menu-item.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAllThings } from '../../../redux/thing/thing.selectors';

const DiscoverOverview = ({ things }) => {
	return (
		<div className="discover">
			<section className="things-container">
				{things.map((thing, i) => (
					<ThingMenuItem key={i} thing={thing}></ThingMenuItem>
				))}
			</section>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	things: selectAllThings
});

export default connect(mapStateToProps)(DiscoverOverview);
