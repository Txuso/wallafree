import './discover-category.component.scss';

import React from 'react';
import ThingMenuItem from '../thing-menu-item/thing-menu-item.component';
import { connect } from 'react-redux';
import { createChatStart } from '../../../redux/chat/chat.actions';
import { selectCategory } from '../../../redux/thing/thing.selectors';
import { withRouter } from 'react-router-dom';

const DiscoverCategory = ({ things, createChat, history }) => {
	const onItemClick = id => {
		createChat(id);
		history.push('/chat');
	};
	return (
		<div className="discover">
			<section className="things-container">
				{things.length > 0 ? (
					things.map(thing => (
						<ThingMenuItem
							onClick={onItemClick}
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

const mapDispatchToProps = dispatch => ({
	createChat: id => dispatch(createChatStart(id))
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DiscoverCategory)
);
