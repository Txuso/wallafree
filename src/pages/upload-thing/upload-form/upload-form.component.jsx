import './upload-form.component.scss';

import { CustomButton, FormInput } from '../../../common/components';
import React, { useState } from 'react';

import { FormSelect } from '../../../common/components/form-select/form-select.component';
import { FormTextArea } from '../../../common/components/form-textarea/form-textarea.component';
import { addThingStart } from '../../../redux/thing/thing.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUserId } from '../../../redux/user/user.selector';

const UploadForm = ({ addThing, userId }) => {
	const [thingInfo, setThingInfo] = useState({
		name: '',
		description: '',
		imageUrl: null,
		categoryId: 'clothes',
		userId: userId
	});

	const { name, description, categoryId, imageUrl } = thingInfo;
	const handleSubmit = async event => {
		event.preventDefault();
		addThing(thingInfo);
	};

	const handleChange = event => {
		const { value, name } = event.target;
		setThingInfo({ ...thingInfo, [name]: value });
	};

	const readURL = e => {
		if (e.target.files && e.target.files[0]) {
			let files = e.target.files;
			let reader = new FileReader();
			reader.onload = r => {
				setThingInfo({
					...thingInfo,
					imageUrl: r.target.result
				});
			};
			reader.readAsDataURL(files[0]);
		}

		// the result image data
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
						required
						handleChange={handleChange}
					/>

					<FormSelect
						name="categoryId"
						label="Category"
						value={categoryId}
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
					<span className="upload-section__title">PICTURE</span>
					{imageUrl ? (
						<img
							value={imageUrl}
							id="avatar"
							alt="avatar"
							className="avatar-rounded"
							src={imageUrl}
						></img>
					) : null}

					<input
						className="input-reader"
						type="file"
						onChange={readURL}
						accept="image/*"
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
