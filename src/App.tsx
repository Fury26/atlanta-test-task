import React from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';

import Header from './pages/header';
import SearchUsers from './pages/searh-users/container';
import UserInfo from './pages/user-info/container';

import './App.css';

const App = () => {
	return (
		<HashRouter>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<SearchUsers />} />
					<Route path="users/:id" element={<UserInfo />} />
				</Routes>
			</div>
		</HashRouter>
	);
};

export default App;
