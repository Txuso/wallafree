import DiscoverPage from './discover.component';
import WithSpinner from '../../common/components/with-spinner/with-spinner';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsThingLoading } from '../../redux/thing/thing.selectors';

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsThingLoading
});

const DiscoverContainer = compose(
	connect(mapStateToProps),
	WithSpinner
)(DiscoverPage);

export default DiscoverContainer;
