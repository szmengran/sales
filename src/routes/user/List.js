import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const confirm = Modal.confirm

const List = ({ onDeleteItem, onEditItem, onUpdateValidstatus, isMotion, location, ...tableProps }) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: '你确认要'+(record.validstatus==="1"?"禁用":"启用")+'该【'+record.username+'】用户吗?',
        onOk () {
          onUpdateValidstatus(record)
          // onDeleteItem(record.username)
        },
      })
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'userid',
      key: 'userid',
    },{
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 64,
      className: styles.avatar,
      render: text => <img alt={'avatar'} width={24} src={text} />,
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      // render: (text, record) => <Link to={`user/${record.username}`}>{text}</Link>,
    }, {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    }, {
      title: '注册IP',
      dataIndex: 'registerip',
      key: 'registerip',
    }, {
      title: '注册时间',
      dataIndex: 'registertime',
      key: 'registertime',
    }, {
      title: '最近登录IP',
      dataIndex: 'lastloginip',
      key: 'lastloginip',
    }, {
      title: '最近登录时间',
      dataIndex: 'lastlogintime',
      key: 'lastlogintime',
    }, {
      title: '更新时间',
      dataIndex: 'updatestamp',
      key: 'updatestamp',
    }, {
      title: '有效状态',
      dataIndex: 'validstatus',
      key: 'validstatus',
      render: (text, record) => <span className={record.validstatus==='1'?'':'red'}>{record.validstatus==='1'?'已启用':'已停用'}</span>,
    }, {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        if(record.validstatus === '1'){
          return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '禁用' }]} />
        }else{
          return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: '更新' }, { key: '2', name: '启用' }]} />
        }
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.userid}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
