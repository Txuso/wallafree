import './discover.component.scss';

import React, { useEffect } from 'react';

import DiscoverCategory from './discover-category/discover-category.component';
import DiscoverOverview from './discover-overview/discover-overview.component';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getThingsStart } from '../../redux/thing/thing.actions';

const DiscoverPage = ({ getThingsStart, match }) => {
	useEffect(() => {
		getThingsStart();
	}, [getThingsStart]);
	return (
		<div className="discover">
			<Route exact path={`${match.path}`} component={DiscoverOverview} />
			<Route
				path={`${match.path}/:categoryId`}
				component={DiscoverCategory}
			/>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	getThingsStart: () => dispatch(getThingsStart())
});

export default connect(null, mapDispatchToProps)(DiscoverPage);
