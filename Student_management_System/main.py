from student import Student
from student_manager import StudentManager
manager=StudentManager()

while True:


    print("""
    
    ===== Student Management System =====
    
    1. Add Student
    2. View Students
    3. Search Student
    4. Delete Student
    5. Find Top Student
    6. Exit
    
    """)


    choice = input("Enter your choice: ")



    if choice == "1":

        student_id = int(input("Enter ID: "))

        name = input("Enter Name: ")

        age = int(input("Enter Age: "))


        marks = []


        for i in range(3):

            mark = int(input(f"Enter mark {i+1}: "))

            marks.append(mark)



        student = Student(
            student_id,
            name,
            age,
            marks
        )


        manager.add_student(student)



    elif choice == "2":

        manager.view_students()



    elif choice == "3":

        student_id = int(input("Enter ID to search: "))

        manager.search_student(student_id)



    elif choice == "4":

        student_id = int(input("Enter ID to delete: "))

        manager.delete_student(student_id)



    elif choice == "5":

        manager.top_student()



    elif choice == "6":

        print("Thank you!")

        break

    else:

        print("Invalid choice")
print(student.to_dict())