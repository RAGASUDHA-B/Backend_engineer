class StudentManager:
    def __init__(self):
        self.students=[]
    def add_student(self,student): # add type
        self.students.append(student)
        print("Student added successfully")
    def view_students(self):
        if len(self.students)==0:
            print("No students available")
            return
        for student in self.students: 
            student.display()
    def search_student(self,student_id):
        for student in self.students:
            if student.student_id==student_id:
                student.display()
                return
        print("Studnet not found")
    def delete_student(self,student_id):
        # use dict to avoid loops. keep student id as key
        for student in self.students:
            if student.student_id==student_id:
                self.students.remove(student)
                print("student deleted")
                return
        print("Student not found")
    def top_student(self):
        if len(self.students)==0:
            print("No student")
            return
        topper=self.students[0]
        for student in self.students: # try avoiding loops. it will take more time if data grows
            if student.calculate_average()>topper.calculate_average():
                topper=student
        print("Top student:")
        topper.display()
    
