const INITIAL_STATE = {
	categories: [
		{
			title: 'Clothes',
			imageUrl:
				'https://media.istockphoto.com/photos/smiling-girl-bying-clothes-in-showroom-picture-id974746544?k=6&m=974746544&s=612x612&w=0&h=9uhFPc804f4lOjWMLK9e7AGfDzq1W8B0WUhTsVil8TA=',
			id: 1,
			linkUrl: 'discover/clothes'
		},
		{
			title: 'Cinema, Books & Music',
			imageUrl:
				'https://media.istockphoto.com/photos/old-school-music-is-the-best-music-picture-id1184929267?k=6&m=1184929267&s=612x612&w=0&h=wIhiHQTuwmSj61Xvui00VNlarw-Xm7XdZP5fEL6lk1E=',

			id: 4,
			linkUrl: 'discover/cinema-books-music'
		},
		{
			title: 'home and garden',
			imageUrl:
				'https://media.istockphoto.com/photos/wooden-terrace-with-yellow-pouf-picture-id948978424?k=6&m=948978424&s=612x612&w=0&h=4Znqt9S_8anKDOQPSvYfBkjYPLz7Z8TbWsj3q2HCkus=',

			id: 5,
			linkUrl: 'discover/home-garden'
		},
		{
			title: 'Electronic Devices',
			imageUrl:
				'https://media.istockphoto.com/photos/devices-responsive-on-workspace-creativity-website-graphic-design-picture-id1061329208?k=6&m=1061329208&s=612x612&w=0&h=nWtyKhvgzkQKGzfhCrHoNCJAzTSDzYi41ZrzYNiS7eM=',
			id: 2,
			size: 'large',
			linkUrl: 'discover/electronic'
		},
		{
			title: 'Sports',
			imageUrl:
				'https://media.istockphoto.com/photos/trail-running-in-the-forest-picture-id485598444?k=6&m=485598444&s=612x612&w=0&h=-NaIJ0JoFIppXhXqOx6rUKnEV1kwd_54JN7DbYiDFFg=',
			id: 3,
			size: 'large',
			linkUrl: 'discover/sports'
		}
	]
};

const categoryReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default categoryReducer;
