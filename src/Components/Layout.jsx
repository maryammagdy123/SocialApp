import React from 'react'
import Navbar from './Navbar/Navbar'
import { Outlet } from 'react-router'
import AsideBar from './AsideBar/AsideBar'


export default function Layout() {
	return (
		<>
			<div className='container'>
				<Navbar />
				<div className="grid grid-cols-1 md:grid-cols-12 gap-2">
					<div className="md:col-span-3">
						<AsideBar />
					</div>
					<div className="lg:col-span-9 col-span-12">
						<Outlet />
					</div>
				</div>



			</div>
		</>
	)
}
