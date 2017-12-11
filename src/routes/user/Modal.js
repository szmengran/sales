import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'
import city from '../../utils/city'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      // data.address = data.address.join(' ')
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="ID" hasFeedback {...formItemLayout}>
          {getFieldDecorator('userid', {
            initialValue: item.userid,
            rules: [
              {
                required: false,
              },
            ],
          })(<Input disabled="true" />)}
        </FormItem>
        <FormItem label="用户名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('username', {
            initialValue: item.username,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="昵称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('nickname', {
            initialValue: item.nickname,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: '',
            rules: [
              {
                required: false,
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

// <FormItem label="性别" hasFeedback {...formItemLayout}>
//   {getFieldDecorator('isMale', {
//     initialValue: item.isMale,
//     rules: [
//       {
//         required: true,
//         type: 'boolean',
//       },
//     ],
//   })(
//     <Radio.Group>
//       <Radio value>男</Radio>
//       <Radio value={false}>女</Radio>
//     </Radio.Group>
//   )}
// </FormItem>
// <FormItem label="年龄" hasFeedback {...formItemLayout}>
//   {getFieldDecorator('age', {
//     initialValue: item.age,
//     rules: [
//       {
//         required: true,
//         type: 'number',
//       },
//     ],
//   })(<InputNumber min={18} max={100} />)}
// </FormItem>
// <FormItem label="手机号码" hasFeedback {...formItemLayout}>
//   {getFieldDecorator('phone', {
//     initialValue: item.phone,
//     rules: [
//       {
//         required: true,
//         pattern: /^1[34578]\d{9}$/,
//         message: 'The input is not valid phone!',
//       },
//     ],
//   })(<Input />)}
// </FormItem>
// <FormItem label="邮箱" hasFeedback {...formItemLayout}>
//   {getFieldDecorator('email', {
//     initialValue: item.email,
//     rules: [
//       {
//         required: true,
//         pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
//         message: '当前输入邮箱无效!',
//       },
//     ],
//   })(<Input />)}
// </FormItem>
// <FormItem label="地址" hasFeedback {...formItemLayout}>
//   {getFieldDecorator('address', {
//     initialValue: item.address && item.address.split(' '),
//     rules: [
//       {
//         required: true,
//       },
//     ],
//   })(<Cascader
//     size="large"
//     style={{ width: '100%' }}
//     options={city}
//     placeholder="选择地址"
//   />)}
// </FormItem>
modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
