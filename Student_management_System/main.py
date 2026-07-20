import json
students=[]
def add_student():
    student_id=int(input("Enter ID:"))
    name=input("Enter Name:")
    age=int(input("Enter Age"))
    marks=[]
    for i in range(3):
        mark=int(input("Enter mark: "))
        marks.append(mark)
    student={
        "id":student_id,
        "name":name,
        "age":age,
        "marks":marks
    }
    students.append(student)
    print("Student added Successfully")
def view_student():
    if len(students)==0:
        print("No students found")
        return
    for student in students:
        print("__________________")
        print("ID:",student["id"])
        print("Name:",student["name"])
        print("Age:",student["age"])
        print("Marks:",student["marks"])
def search_student():
    search_id=int(input("Enter student ID: "))
    for student in students:
        if student["id"]==search_id:
            print("student")
            return
    print("Student not found")
def calculate_average(student):
    total=sum(student["marks"])
    average=total/len(student["marks"])
    return average

def top_student():
    topper=None
    highest=0
    for student in students:
        avg=calculate_average(student)
        if avg>highest:
            highest=avg
            topper=student
        print("Top student: ")
        print(topper)
while True:
    print("""
          1.Add student
          2.view students
          3.search student
          4.top student
          5. exit""")
    c=int(input("enter choices: "))
    if c==1:
        add_student()
    elif c==2:
        view_student()
    elif c==3:
        search_student()
    elif c==4:
        top_student()
    elif c==5:
        break
    else:
        print("Invalid choice")

def save_data():
    with open("students.json","w") as file:
        json.dump(
            students,
            file
        )
save_data()