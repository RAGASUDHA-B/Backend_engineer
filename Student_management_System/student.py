class Student:
    # also read about dynamic args **kwargs
    def __init__(self,student_id,name,age,marks): # its better to have type check like student_id: int, name: str like this it will avoid app crashes on wrong value
        self.student_id=student_id
        self.name=name
        self.age=age
        self.marks=marks
    def calculate_average(self):
        total=sum(self.marks)
        average=total/len(self.marks) # it might throw div by zero error. handle that
        return average
    def display(self): # read about __str__ 
        print("___________")
        print("ID:",self.student_id)
        print("Name: ",self.name)
        print("Age:",self.age)
        print("Marks:",self.marks)
        print("Average: ",self.calculate_average())
    def to_dict(self): # read about __dict__
        return {
        "id": self.student_id,
        "name": self.name,
        "age": self.age,
        "marks": self.marks
    } # indendaiton error
