import './discover-category.component.scss';

import React from 'react';
import ThingMenuItem from '../thing-menu-item/thing-menu-item.component';
import { connect } from 'react-redux';
import { selectCategory } from '../../../redux/thing/thing.selectors';

const DiscoverCategory = ({ things }) => {
	return (
		<div className="discover">
			<section className="things-container">
				{things.length > 0 ? (
					things.map(thing => (
						<ThingMenuItem
							key={thing.id}
							thing={thing}
						></ThingMenuItem>
					))
				) : (
					<h3>Sorry no things available for this category :-(</h3>
				)}
			</section>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	things: selectCategory(ownProps.match.params.categoryId)(state)
});

export default connect(mapStateToProps)(DiscoverCategory);
