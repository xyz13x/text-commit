/*
 * @Author: wangsc
 * @Date: 2024-09-07 20:29:14
 * @LastEditTime: 2024-09-07 21:01:59
 * @LastEditors: wangsc
 * @Description: 请求配置信息
 */
import axios from 'axios'

const service = axios.create({
	baseURL: 'https://api.imooc-web.lgdsunday.club/api',
	timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		config.headers.icode = 'hellosunday'
		return config // 必须返回配置
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 响应拦截器
service.interceptors.response.use((response) => {
	const { success, message, data } = response.data
	//   要根据success的成功与否决定下面的操作
	if (success) {
		return data
	} else {
		return Promise.reject(new Error(message))
	}
})

export default service
