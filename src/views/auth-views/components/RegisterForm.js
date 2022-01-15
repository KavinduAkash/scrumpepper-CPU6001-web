import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert } from "antd";
import { showAuthMessage, showLoading, hideAuthMessage, authenticated } from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import axios from "axios";
import Cookies from "js-cookie";
import { notification } from 'antd';

const rules = {
	user_name: [
		{
			required: true,
			message: 'Please input username'
		}
	],
	email: [
		{ 
			required: true,
			message: 'Please input your email address'
		},
		{ 
			type: 'email',
			message: 'Please enter a validate email!'
		}
	],
	password: [
		{ 
			required: true,
			message: 'Please input your password'
		}
	],
	first_name: [
		{
			required: true,
			message: 'Please input your first name'
		}
	],
	last_name: [
		{
			required: true,
			message: 'Please input your last name'
		}
	],
	confirm: [
		{ 
			required: true,
			message: 'Please confirm your password!'
		},
		({ getFieldValue }) => ({
			validator(rule, value) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}
				return Promise.reject('Passwords do not match!');
			},
		})
	]
}

export const RegisterForm = (props) => {

	const { showLoading, token, loading, redirect, message, showMessage, hideAuthMessage, authenticated, allowRedirect } = props
	const [form] = Form.useForm();
	let history = useHistory();

	const onSignUp = () => {
    	form.validateFields().then(values => {


    		console.log(values);

			let headers = {
				'Content-Type':'application/json',
			};

    		let request_body = {
    			"ref": values.user_name,
    			"firstName": values.first_name,
    			"lastName": values.last_name,
    			"contactNumber": null,
				"email": values.email,
				"password":values.password
			}

			let method = "post";

			axios[method](`http://localhost:8080/v1/user/register`, request_body, {headers: headers})
				.then(async response => {

					// let user = response.data.user;
					// let accessToken = response.data.access_token;
					// let refreshToken = response.data.refresh_token;
					// Cookies.set('68e78905f4c', accessToken);
					// Cookies.set('68e75190f4c', refreshToken);
					// this.setState({loading: false});
					// this.props.history.push("/app/project");


					console.log(response);

					const args = {
						message: 'Your account created successfully!🥳🥳',
						description: 'Please login to the PM tool for access. \nyou will redirect to the login page in next 3 seconds.',
					// duration: 1000
					};
					notification.open(args);

					setTimeout(() => {
						props.history.push("/auth/login");
					}, 2000);

				}).catch(async error => {
				this.setState({loading: false});

				this.setState({showMessage:1});
				setTimeout(() => {
					this.setState({showMessage:0});
				}, 2000);

				this.props.showAuthMessage(error);
			});


		}).catch(info => {
			console.log('Validate Failed:', info);
		});
	}

	useEffect(() => {
    	if (token !== null && allowRedirect) {
			history.push(redirect)
		}
		if(showMessage) {
				setTimeout(() => {
				hideAuthMessage();
			}, 3000);
		}
  });
	
	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>

			<Form form={form} layout="vertical" name="register-form" onFinish={onSignUp}>

				<Form.Item
					name="user_name"
					label="User Name"
					rules={rules.user_name}
					hasFeedback
				>
					<Input prefix={<UserOutlined className="text-primary" />}/>
				</Form.Item>

				<Form.Item
					name="first_name"
					label="First Name"
					rules={rules.first_name}
					hasFeedback
				>
					<Input prefix={<UserOutlined className="text-primary" />}/>
				</Form.Item>

				<Form.Item
					name="last_name"
					label="Last Name"
					rules={rules.last_name}
					hasFeedback
				>
					<Input prefix={<UserOutlined className="text-primary" />}/>
				</Form.Item>

				<Form.Item
					name="email" 
					label="Email" 
					rules={rules.email}
					hasFeedback
				>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>

				<Form.Item 
					name="password" 
					label="Password" 
					rules={rules.password}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="confirm" 
					label="ConfirmPassword" 
					rules={rules.confirm}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign Up
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

const mapStateToProps = ({auth}) => {
	const { loading, message, showMessage, token, redirect } = auth;
  return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	showAuthMessage,
	hideAuthMessage,
	showLoading,
	authenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
