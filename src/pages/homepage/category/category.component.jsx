import './category.component.scss';

import MenuItem from '../menu-item/menu-item.component';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSections } from '../../../redux/categories/categories.selectors';

class Category extends React.Component {
	render() {
		return (
			<div className="category-menu">
				{this.props.sections.map(({ id, ...otherSectionProps }) => (
					<MenuItem key={id} {...otherSectionProps} />
				))}
			</div>
		);
	}
}
const mapStateToProps = createStructuredSelector({
	sections: selectSections
});
export default connect(mapStateToProps)(Category);
