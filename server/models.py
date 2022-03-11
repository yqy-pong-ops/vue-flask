'''
Author: Axiuxiu
Date: 2022-02-26 17:30:19
LastEditTime: 2022-03-11 11:14:42
Description: 定义数据库模型
'''

from datetime import datetime
from sqlalchemy import Column, DateTime, String
from werkzeug.security import generate_password_hash, check_password_hash
from uuid import uuid4
from exts import db

def gen_id():
    return uuid4().hex

class User(db.Model):
    '''用户表'''
    __tablename__='users'

    id=Column(String(32), default=gen_id, primary_key=True)
    # 邮箱
    email=Column(String(20), unique=True)
    # 手机号码
    phone=Column(String(20), unique=True)
    # 所属单位
    unit=Column(String(50))
    # 居住地址
    address=Column(String(50))
    # 个人介绍
    intro=Column(String(500))
    username=Column(String(20), nullable=False)
    # pwd=Column(String(20), nullable=False)
    hash_pwd=Column(String(256), nullable=False)
    create_time=Column(DateTime, default=datetime.now)
    avatar_url=Column(String(256),default='/static/user.png')

    def __repr__(self) -> str:
        return 'User '+self.username

    @property
    def pwd(self):
        raise AttributeError('禁止读取密码')
    
    @pwd.setter
    def pwd(self,plain_pwd):
        self.hash_pwd=generate_password_hash(plain_pwd)
    
    # 检查密码
    def check_pwd_hash(self,pwd):
        return check_password_hash(self.hash_pwd, pwd)