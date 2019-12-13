import './upload-thing.component.scss';

import UploadThingPage from './upload-thing.component';
import WithSpinner from '../../common/components/with-spinner/with-spinner';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectIsThingLoading } from '../../redux/thing/thing.selectors';

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsThingLoading
});

const UploadThingContainer = compose(
	connect(mapStateToProps),
	WithSpinner
)(UploadThingPage);

export default UploadThingContainer;
