import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Input,
  // Button,
  Toast
} from 'antd-mobile'
import NavBarCustom from '../../components/NavBarCustom'
import './index.less'
import ButtonCustom from '../../components/ButtonCustom'
import { api } from '../../api'
import utils from '../../assets/utils'
import action from '../../store/action'

//自定义表单规则
const validate = {
  phone(_, value) {
    value = value.trim();
    if (value.length === 0) return Promise.reject(new Error('The Phone number is required'));
    let reg = /^(?:(?:\+|00)86)?1\d{10}$/;
    if (!reg.test(value)) return Promise.reject(new Error('Please correct your phone number'));
    return Promise.resolve();
  },
  code(_, value) {
    value = value.trim();
    if (value.length === 0) return Promise.reject(new Error('The code number is required'));
    let reg = /^\d{6}$/;
    if (!reg.test(value)) return Promise.reject(new Error('Code length must be 6'));
    return Promise.resolve();
  }
}

//内置校验规则
// const rules = [
//   { required: true, message: 'xxx' },
//   { pattern: /^\d{6}$/, message: 'xxxx' }
// ]

function Login(props) {

  let [form] = Form.useForm();
  let [disabled, setDisabled] = useState(false),
    [sendCodeButton, setSendCodeButton] = useState('sendCode');
  let { queryUserInfoAsync, navigate, usp } = props;
  // [sendLoading, setSendLoading] = useState(false),
  // [submitLoading, setSubmitLoading] = useState(false);

  // const delay = (interval = 10000) => {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve()
  //     }, interval)
  //   })
  // }
  let timer = null,
    num = 31;
  const countDown = () => {
    num--;
    if (num === 0) {
      clearInterval(timer);
      timer = null;
      setSendCodeButton('sendCode');
      setDisabled(false)
      return;
    }
    setSendCodeButton(`sendCode(${num}s)`);
  }

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);//卸载组件时清除定时器
        timer = null;//eslint-disable-line
      }
    }
  }, [])//eslint-disable-line

  const sendCode = async () => {
    try {
      await form.validateFields(['phone'])//表单校验

      setDisabled(true)
      let phone = form.getFieldValue('phone')
      let { code } = await api.sendCodeToPhone(phone)
      if (+code !== 0) {
        Toast.show({
          icon: 'fail',
          content: 'Failed',
          duration: 1000
        });
        setDisabled(false);
        return;
      }
      countDown();
      if (!timer) timer = setInterval(countDown, 1000);//设置循环定时器，每秒执行一次countdown

    } catch (error) { console.log(error) }
    // setDisabled(false)
  }

  const onSubmit = async () => {
    try {
      await form.validateFields();
      let { phone, code } = form.getFieldsValue();
      let { code: resCode, token } = await api.loginByCode(phone, code)
      if (+resCode !== 0) {
        Toast.show({
          icon: 'fail',
          content: 'Failed',
          duration: 1000
        });
        form.resetFields(['code']);
        return;
      }
      //登录成功，则存储token到缓存
      utils.storage.set('tk', token);

      //通过redux异步获取用户信息，并存入公共状态
      await queryUserInfoAsync();

      Toast.show({
        icon: 'success',
        content: 'Login Success',
        duration: 1000
      });

      //路由跳转
      let to = usp.get('to');
      to ? navigate(to, { replace: true },) : navigate(-1);
      // history.go(-1); //router V5
      // history.pushState({//router V5
      //   pathname: '/xxx',
      //   search: '',
      //   state: ''
      // })
      // navigate({
      //   pathname: '/xxx',
      //   search: ''
      // }, {state: ''})
      // history.replace('/xxx')//router V5
      // navigate('/xxx', {replace: true})

    } catch (error) { }

  }

  return (
    <div className='login-box'>
      <NavBarCustom title='Sign In/ Sign Up' />
      <Form
        layout='horizontal'
        form={form}
        initialValues={{ phone: '', code: '' }}
        style={{
          '--border-top': '1px solid #ddd',
          '--border-inner': '1px solid #ddd',
          '--border-bottom': '1px solid #ddd',
        }}
        footer={
          <ButtonCustom block color='primary' size='large' onClick={onSubmit}
          // type='submit'
          >
            Sign In/Up
          </ButtonCustom>
        }
      // onFinish={onSubmit} //使用form内置属性触发提交
      >
        <Form.Item name='phone' label='Phone:' required rules={[{ validator: validate.phone }]}>
          <Input placeholder='Please type your phone here' />
        </Form.Item>
        <Form.Item name='code' label='Code:' required rules={[{ validator: validate.code }]}//表单校验
          extra={
            <ButtonCustom size='small'
              color='primary'
              onClick={sendCode}
              disabled={disabled}
            >
              {sendCodeButton}
            </ButtonCustom>}>
          <Input placeholder='Please type your code here' />
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect(
  null,
  action.base
)(Login)