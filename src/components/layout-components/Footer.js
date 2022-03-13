import React from 'react'
import { APP_NAME } from 'configs/AppConfig';

export default function Footer() {
	return (
		<footer className="footer">
			<span>Copyright  &copy;  {`${new Date().getFullYear()}`} <span className="font-weight-semibold">{`Scrum Pepper By Kavindu Akash`}</span> All rights reserved.</span>
		</footer>
	)
}

