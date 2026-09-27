from fastapi import FastAPI,Depends,HTTPException
from database import engine,Base,SessionLocal
from models import Student,Task,Category,Taskcategory
from schemas import StudentCreate,TaskCreate

Base.metadata.create_all(bind=engine)
app=FastAPI()


def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return{"message":"student task manager api is running"}




#student
@app.post("/students")
def create_students(student:StudentCreate,db=Depends(get_db)):
    new_student=Student(
        name=student.name,
        email=student.email,
        phone_no=student.phone_no
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

@app.get("/students")
def get_students(db=Depends(get_db)):
    return db.query(Student).all()

@app.get("/students/{student_id}")
def get_students(student_id:int,db=Depends(get_db)):
    student=db.query(Student).filter(Student.student_id==student_id).first()
    if student is None:
        raise HTTPException(
            status_code=404,
            detail="Stduent not found"
        )
    return student

@app.put("/students/{student_id}")
def update_student(
    student_id:int,
    student_data:StudentCreate,
    db=Depends(get_db)
):
    student=db.query(Student.student_id==student_id).first()
    if student is None:
        raise HTTPException(
            status_code=404,
            detail="student not found"
        )
    student.name=student_data.name
    student.email=student_data.email
    student.phone_no=student_data.phone_no

    db.commit()
    db.refresh(Student)

    return student

@app.delete("/students/{student_id}")
def delete_student(student_id:int,db=Depends(get_db)):
    student=db.query(Student).filter(Student.student_id==student_id).first()
    if student is None:
        raise HTTPException(
            status_code=404,
            detail="student not found"
        )
    db.delete(student)
    db.commit()
    return{"message":"student deleted successfully"}





#task
@app.post("/tasks")
def create_task(task:TaskCreate,db=Depends(get_db)):
    new_task=Task(
        name=task.name,
        status=task.status,
        student_id=task.student_id
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task

@app.get("/tasks")
def get_tasks(db=Depends(get_db)):
    return db.query(Task).all()

@app.get("/tasks/{task_id}")
def get_task(task_id:int,db=Depends(get_db)):
    task=db.query(Task).filter(Task.task_id==task_id).first()
    if task is None:
        raise HTTPException(
            status_code=404,
            detail="task not found"
        )
    return task

@app.put("/tasks/{task_id}")
def update_task(
   task_id:int,
   task_data=TaskCreate,
   db=Depends(get_db)
):
    task=db.query(Task).filter(Task.task_id==task_id).first()
    if task is none:
        raise HTTPException(
            status_code=404,
            detail="task not found"
        )
    task.name=task_data.name
    task.status=task_data.task
    task.student_id=task_data.student_id
    db.commit()
    db.refresh(task)
    return task

@app.delete("/tasks/{task_id}")
def delete_task(task_id:int,db=Depends(get_db)):
    task=db.query(Task).filter(Task.task_id==task_id).first()

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="task not found"
        )
    db.delete(task)
    db.commit()
    return {"message":"task deleted successfully"}



#category