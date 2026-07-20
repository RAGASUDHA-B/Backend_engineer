class Student:
    def __init__(self,student_id,name,age,marks):
        self.student_id=student_id
        self.name=name
        self.age=age
        self.marks=marks
    def calculate_average(self):
        total=sum(self.marks)
        average=total/len(self.marks)
        return average
    def display(self):
        print("___________")
        print("ID:",self.student_id)
        print("Name: ",self.name)
        print("Age:",self.age)
        print("Marks:",self.marks)
        print("Average: ",self.calculate_average())