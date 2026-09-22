from sqlalchemy import Column,Integer,String,DateTime,ForeignKey
from database import Base
class Student(Base):
    __tablename__="students"

    student_id=Column(Integer,primary_key=True,index=True)
    name=Column(String)
    email=Column(String)
    phone_no=Column(String)

class Task(Base):
    __tablename__="task"

    task_id=Column(Integer,primary_key=True,index=True)
    name=Column(String)
    created_at=Column(DateTime)
    status=Column(String)
    student_id=Column(Integer,ForeignKey("students.student_id"))

class Category(Base):
    __tablename__="categories"
    category_id=Column(Integer,primary_key=True,index=True)
    category_name=Column(String)

class Taskcategory(Base):
    __tablename__="task_category"
    task_id=Column(Integer,ForeignKey("task.task_id"),primary_key=True)
    category_id=Column(Integer,ForeignKey("categories.category_id"),primary_key=True)

