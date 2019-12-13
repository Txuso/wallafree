import './discover.component.scss';

import React, { useEffect } from 'react';

import ThingMenuItem from './thing-menu-item/thing-menu-item.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getThingsStart } from '../../redux/thing/thing.actions';
import { selectAllThings } from '../../redux/thing/thing.selectors';

const DiscoverPage = ({ getThingsStart, things }) => {
	useEffect(() => {
		getThingsStart();
	}, [getThingsStart]);
	return (
		<div className="discover">
			<h1>Discover things around you</h1>
			{things.map(thing => (
				<ThingMenuItem key={thing.id} thing={thing}></ThingMenuItem>
			))}
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	getThingsStart: () => dispatch(getThingsStart())
});

const mapStateToProps = createStructuredSelector({
	things: selectAllThings
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);
