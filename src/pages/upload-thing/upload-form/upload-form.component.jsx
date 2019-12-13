import './upload-form.component.scss';

import { CustomButton, FormInput } from '../../../common/components';
import React, { useState } from 'react';

import { FormSelect } from '../../../common/components/form-select/form-select.component';
import { FormTextArea } from '../../../common/components/form-textarea/form-textarea.component';
import ImageUploader from 'react-images-upload';
import { addThingStart } from '../../../redux/thing/thing.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUserId } from '../../../redux/user/user.selector';

const UploadForm = ({ addThing, userId }) => {
	const [thingInfo, setThingInfo] = useState({
		name: '',
		description: '',
		imageUrl: {},
		selectedCategory: '1',
		userId: userId
	});

	const { name, description, selectedCategory } = thingInfo;
	const handleSubmit = async event => {
		event.preventDefault();
		addThing(thingInfo);
	};

	const handleChange = event => {
		const { value, name } = event.target;
		setThingInfo({ ...thingInfo, [name]: value });
	};

	const onDrop = picture => {
		console.log('onDrop', picture);

		setThingInfo({ ...thingInfo, imageUrl: picture });
		console.log('a ver', thingInfo);
	};

	return (
		<div className="upload-thing">
			<form onSubmit={handleSubmit}>
				<section className="upload-section">
					<span className="upload-section__title">
						THING INFORMATION
					</span>
					<FormInput
						name="name"
						label="What are you giving away/exchanging?"
						placeholder="Some words describing it"
						value={name}
						type="text"
						handleChange={handleChange}
						required
					/>

					<FormTextArea
						name="description"
						label="Description"
						placeholder="Add product status, color and more useful info"
						value={description}
						type="textarea"
						required
						handleChange={handleChange}
					/>

					<FormSelect
						name="selectedCategory"
						label="Category"
						value={selectedCategory}
						options={[
							{ value: '1', label: 'Clothes' },
							{ value: '2', label: 'Cinema, Books & Music' },
							{ value: '3', label: 'home and garden' },
							{ value: '4', label: 'Electronic Devices' },
							{ value: '5', label: 'Sports' }
						]}
						handleChange={handleChange}
						required
					/>
				</section>

				<section className="upload-section">
					<span className="upload-section__title">PICTURES</span>
					<ImageUploader
						withIcon={true}
						buttonText="Choose One Image"
						onChange={onDrop}
						imgExtension={['.jpg', '.png']}
						maxFileSize={5242880}
						withPreview={true}
						singleImage={true}
					/>
				</section>
				<div className="sign-in-buttons">
					<CustomButton type="submit">Sumbit Thing</CustomButton>
				</div>
			</form>
		</div>
	);
};
const mapStateToProps = createStructuredSelector({
	userId: selectCurrentUserId
});
const mapDispatchToProps = dispatch => ({
	addThing: thing => dispatch(addThingStart(thing))
});
export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);
