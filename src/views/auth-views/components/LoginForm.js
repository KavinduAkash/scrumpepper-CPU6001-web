import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { GoogleSVG, FacebookSVG } from 'assets/svg/icon';
import CustomIcon from 'components/util-components/CustomIcon'
import {  
	showLoading, 
	showAuthMessage, 
	hideAuthMessage,
	authenticated
} from 'redux/actions/Auth';
import { motion } from "framer-motion"
import axios from "axios";
import Cookies from 'js-cookie';
import {withRouter} from "react-router-dom";

class LoginForm extends React.Component{
	state = {
		username:"",
		password:"",
		showMessage:0,
		message: "Invalid Credentials! Please enter correct credentials and try again",
		loading:false
	};

	onChangeUsername = e => {
		this.setState({username: e.target.value});
	};

	onChangePassword = e => {
		this.setState({password: e.target.value});
	};

	onLogin = values => {
		this.setState({loading: true});
		let headers = {
			'Content-Type':'application/x-www-form-urlencoded',
			"Authorization": "Basic " + "VVNFUjo="
		};
		let method = "post";
		let formData = new FormData();
		formData.append('grant_type','password');
		formData.append('username',this.state.username);
		formData.append('password',this.state.password);

		axios[method](`http://localhost:8080/v1/authorize`, method !== 'get'? formData : {headers: headers}, {headers: headers})
			.then(async response => {

				let user = response.data.user;
				let accessToken = response.data.access_token;
				let refreshToken = response.data.refresh_token;
				Cookies.set('68e78905f4c', accessToken);
				Cookies.set('68e75190f4c', refreshToken);
				this.setState({loading: false});
				this.props.history.push("/app/project");

			}).catch(async error => {
			this.setState({loading: false});

				this.setState({showMessage:1});
				setTimeout(() => {
					this.setState({showMessage:0});
				}, 2000);

			this.props.showAuthMessage(error);
			});
	};

	onGoogleLogin = () => {
		showLoading()
	};

	onFacebookLogin = () => {
		showLoading()
	};

	render() {


		let renderOtherSignIn = (
			<div>
				<Divider>
					<span className="text-muted font-size-base font-weight-normal">or connect with</span>
				</Divider>
				{/*<div className="d-flex justify-content-center">*/}
				{/*	<Button*/}
				{/*		onClick={() => onGoogleLogin()}*/}
				{/*		className="mr-2"*/}
				{/*		disabled={loading}*/}
				{/*		icon={<CustomIcon svg={GoogleSVG}/>}*/}
				{/*	>*/}
				{/*		Google*/}
				{/*	</Button>*/}
				{/*	<Button*/}
				{/*		onClick={() => onFacebookLogin()}*/}

				{/*		icon={<CustomIcon svg={FacebookSVG}/>}*/}
				{/*		disabled={loading}*/}
				{/*	>*/}
				{/*		Facebook*/}
				{/*	</Button>*/}
				{/*</div>*/}
			</div>
		)

		return (
			<div>
				<motion.div
					style={{display:`${this.state.showMessage ? 'block' : 'none'}`}}
					initial={{opacity: 0, marginBottom: 0}}
					animate={{
						opacity: this.state.showMessage ? 1 : 0,
						marginBottom: this.state.showMessage ? 20 : 0
					}}>
					<Alert type="error" showIcon message={this.state.message}></Alert>
				</motion.div>
				<Form
					layout="vertical"
					name="login-form"
				>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								message: 'Please input your email',
							},
							{
								type: 'email',
								message: 'Please enter a validate email!'
							}
						]}>
						<Input prefix={<MailOutlined className="text-primary"/>} onChange={this.onChangeUsername}/>
					</Form.Item>
					<Form.Item
						name="password"
						// label={
							// <div
							// 	className={`${showForgetPassword ? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							// 	<span>Password</span>
							// 	{
							// 		showForgetPassword &&
							// 		<span
							// 			onClick={() => onForgetPasswordClick}
							// 			className="cursor-pointer font-size-sm font-weight-normal text-muted"
							// 		>
							// 		Forget Password?
							// 	</span>
							// 	}
							// </div>
						// }
						rules={[
							{
								required: true,
								message: 'Please input your password',
							}
						]}
					>
						<Input.Password prefix={<LockOutlined className="text-primary"/>} onChange={this.onChangePassword}/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							block
							loading={this.state.loading}
							onClick={this.onLogin}
						>
							Sign In
						</Button>
					</Form.Item>
					{/*{*/}
					{/*	otherSignIn ? renderOtherSignIn : null*/}
					{/*}*/}
					{/*{extra}*/}
				</Form>
			</div>
		)
	}
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  	return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))
