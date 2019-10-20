import { GlobalStyle } from './global.styles';
import Header from './common/components/header/header.component';
import React from 'react';

function App() {
	return (
		<div>
			<GlobalStyle />
			<Header />

			<h1>Wallafree</h1>
			<p>
				Compiled successfully! You can now view create-react-app in the
				browser. Local: http://localhost:3000/ On Your Network:
				http://192.168.1.33:3000/ Note that the development build is not
				optimized. To create a production build, use yarn build.
				Compiled successfully! You can now view create-react-app in the
				browser. Local: http://localhost:3000/ On Your Network:
				http://192.168.1.33:3000/ Note that the development build is not
				optimized. To create a production build, use yarn build.
			</p>
		</div>
	);
}

export default App;
