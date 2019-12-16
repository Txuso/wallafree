import './myprofile.component.scss';

import { CustomButton, FormInput } from '../../common/components';
import React, { useState } from 'react';

import { FormTextArea } from '../../common/components/form-textarea/form-textarea.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { updateUserInfo } from '../../redux/user/user.actions';

const MyProfilePage = ({ updateUserInfo, currentUser }) => {
	const [userInfo, setUserInfo] = useState({
		displayName: currentUser.displayName,
		description: currentUser.description,
		imageUrl: currentUser.imageUrl,
		userId: currentUser.id,
		email: currentUser.email,
		newImageToProcess: currentUser.imageUrl
	});

	React.useEffect(() => {
		setUserInfo(currentUser);
	}, [currentUser]);

	const handleSubmit = event => {
		event.preventDefault();
		updateUserInfo(userInfo);
	};
	const handleChange = event => {
		const { value, name } = event.target;
		setUserInfo({ ...userInfo, [name]: value });
	};

	const readURL = e => {
		if (e.target.files && e.target.files[0]) {
			let files = e.target.files;
			console.log(files);
			let reader = new FileReader();
			reader.onload = r => {
				setUserInfo({
					...userInfo,
					newImageToProcess: r.target.result,
					imageUrl: r.target.result
				});
			};
			reader.readAsDataURL(files[0]);
		}

		// the result image data
	};

	const { displayName, description, email, imageUrl } = userInfo;

	return (
		<div className="myprofile">
			<h1>Profile Page</h1>
			<form className="myprofile__form" onSubmit={handleSubmit}>
				<section className="main-info">
					<label>Your Image</label>
					<section className="myprofile__image-wrapper">
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
					<FormInput
						name="displayName"
						label="Name"
						placeholder="Your name"
						value={displayName}
						type="text"
						handleChange={handleChange}
						required
					/>

					<FormInput
						name="email"
						label="Email"
						placeholder="Email"
						value={email}
						type="email"
						handleChange={handleChange}
						required
					/>

					<FormTextArea
						name="description"
						label="Description"
						placeholder="A bit about you if you want..."
						value={description}
						handleChange={handleChange}
					/>
					<CustomButton type="submit">Update Profile</CustomButton>
				</section>
			</form>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
	updateUserInfo: userInfo => dispatch(updateUserInfo(userInfo))
});
export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage);
