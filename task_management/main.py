from fastapi import FastAPI,Depends
from database import engine,Base,SessionLocal
from models import Student,Task,Category,Taskcategory
from schemas import StudentCreate

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






        