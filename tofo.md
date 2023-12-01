# 需要的准备

## 数据库

数据库字段存储用蛇形命名，返回用驼峰命名，可以搜索java转驼峰命名库。

### user 表

| 字段名 | 数据库内名 | 数据类型 |
| --- | --- | --- |
| 用户id | user_id(主键) | char |
| 用户名 | username | char |
| 密码 | password | char |
| 角色 | role | int |
| 创建日期 | create_date | date |
| 更新日期 | update_date | date |

### book 表

| 字段名 | 数据库内名 | 数据类型 | 备注 |
| --- | --- | --- | --- |
| id | id(主键) | char | |
| ISBN | isbn | char | |
| 书名 | book_name | char | |
| 作者 | author | char | |
| 类型 | type | int | |
| 入库数量 | num | int | |
| 位置 | address | char | |
| 出版商 | publisher | char | |
| 上架日期 | date | date | |
| 状态 | status | int | 1 -> 在库，未被借出，2 -> 借出，3 -> 销毁 |
| 是否归还 | returned | boolean | |
| 创建日期 | create_date | date | |
| 更新日期 | update_date | date | |

## 接口

### 登录

post 请求，接收数据 

```json
{
    "username": "xxx",
    "password": "xxx"
}
```

返回 

```json
// 成功
{
    "code":20000,
    "data":{
        "token":"admin-token"
    }
}

// 失败
{
    "code": 1000,
    "data": {
        "message": "失败"
    }
}
```

### dashboard 相关接口

#### 顶部接口 get

查询所有图书信息，根据状态和时间筛选，返回对应的数量。

返回

```json
{
    "code": 2000,
    "data": {
        "store": 1,
        "borrow": 2,
        "destroy": 3,
        "add": 4,
        "todayBorrow": 5
    }
}
```

#### 中部接口 get

返回 

```json
{
    "code": 2000,
    "data": [
        {"month": 1, "borrow": 1, "return": 1},
        {"month": 2, "borrow": 2, "return": 2}
        // ...
    ]
}
```

### 借阅类型统计 get

根据类型查找借出的书籍，返回

```json
{
    "code": 2000,
    "data": [
        {"type": 1, "borrow": 2},
        {"type": 2, "borrow": 4},
        // ...
    ]
}
```

## Books

四个接口

### 查询 get

接收如下字段

```json
{
    "bookName": "",
    "isbn": "",
    "type": ""
}
```

返回

```json
{
    "code": 2000,
    "data": [

        // 数据库所有字段
    ]
}
```

### 新增 post

新增post，没有id

```json
{
    isbn: '',
    bookName: '',
    author: '',
    type: '',
    num: '',
    address: '',
    publisher: '',
    date: ''
}
```

返回

```json
{
    "code": 2000,
    "data": "ok"
}
```

### 修改 put

修改，有id

```json
{
    "id": '',
    isbn: '',
    bookName: '',
    author: '',
    type: '',
    num: '',
    address: '',
    publisher: '',
    date: ''
}
```

返回

```json
{
    "code": 2000,
    "data": "ok"
}
```

### 销毁 put

销毁，只传id

```json
{
    "id": "xx"
}
```

返回

```json
{
    "code": 2000,
    "data": "ok"
}
```

### 分页

## Users

### 查询 get

接收数据

```json
{
    "username": "",
    "role": ""
}
```

### 新增 post

```json
{
    name: '',
    password: '',
    role: ''
}
```

### 修改 put

```json
{
    id: 'xx',
    name: '',
    password: '',
    role: ''
}
```

### 删除 delete

```json
{
    "id": "xxx"
}
```
