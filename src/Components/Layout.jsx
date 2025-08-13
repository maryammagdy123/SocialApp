import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router'
import AsideBar from './AsideBar/AsideBar'

export default function Layout() {
	return (
		<>
			<div className='container'>
				<Navbar />
				<AsideBar/>
				<Outlet />
			</div>
		</>
	)
}
