import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Card, Row, Col } from "antd";
import { useSelector } from 'react-redux';
import {Logo} from "../../../../components/layout-components/Logo";

const backgroundStyle = {
	// backgroundImage: 'url(/img/others/img-17.jpg)',
	backgroundImage: 'url(/img/others/login-bg-1.png)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

class LoginOne extends React.Component {

	state = {
		username: "",
		password: ""
	};

	login = () => {

	};

	// const theme = useSelector(state => state.theme.currentTheme)
	render() {
		return (
			<div className="h-100" style={backgroundStyle}>
				<div className="container d-flex flex-column justify-content-center h-100">
					<Row justify="center">
						<Col xs={20} sm={20} md={20} lg={7}>
							<Card>
								<div className="my-4">
									<div className="text-center">
										{/*<img className="img-fluid" src={`/img/${theme === 'light' ? 'logo.png': 'logo-white.png'}`} alt="" />*/}
										<img src={'/img/sp-logo1.png'} alt="scrumpepper-logo" style={{marginBottom:'40px'}}/>
										<p>Don't have an account yet? <a href="/auth/register">Sign Up</a></p>
									</div>
									<Row justify="center">
										<Col xs={24} sm={24} md={20} lg={20}>
											<LoginForm {...this.props} />
										</Col>
									</Row>
								</div>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}

export default LoginOne
