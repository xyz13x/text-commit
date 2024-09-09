/*
 * @Author: wangsc
 * @Date: 2024-09-07 20:45:50
 * @LastEditTime: 2024-09-09 19:44:13
 * @LastEditors: wangsc
 * @Description: 
 */
import request from '../utils/request.js';

// 获取数据接口
export const getVisualization = () =>{
  return request({
    url: '/visualization',
  })
}