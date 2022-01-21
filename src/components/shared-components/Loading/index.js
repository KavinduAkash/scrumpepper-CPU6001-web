import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons';
import './spinner-layer.scss'

const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />

const Loading = (props) => {
	const { align, cover, loading } = props
	return (
		<div className={`loading text-${align} cover-${cover} ma-spinner-layer`} style={{display: loading?'block':'none'}}>
			<Spin
				// indicator={Icon}
				size="large"
				style={{marginTop: '50px'}}
			/>
		</div>
	)
}

Loading.propTypes = {
	size: PropTypes.string,
	cover: PropTypes.string
}

Loading.defaultProps = {
	align: 'center',
	cover: 'inline'
};

export default Loading
