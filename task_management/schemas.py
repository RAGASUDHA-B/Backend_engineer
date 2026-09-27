from pydantic import BaseModel

class StudentCreate(BaseModel):
    name:str
    email:str
    phone_no:str

class TaskCreate(BaseModel):
    name:str
    status:str
    student_id:int
    