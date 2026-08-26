def greet():
    print("hello!")
greet()


#list comprehension
numbers=[1,2,3,4,5,6]
even_numbers=[]
for num in numbers:
    if num%2==0:
        even_numbers.append(num)
print(even_numbers)

numbers=[1,2,3,4,5,6,7,8]
even_numbers=[num for num in numbers if num%2==0]
print(even_numbers)

#dictionary comprehension
numbers=[1,2,3,4,5]
squares={num:num**2 for num in numbers}
print(squares)

# args
def add(a,*b):
    c=0
    for i in b:
        c+=i
    print(a+c)
add(10,20)
add(10,20,30)
add(10,20,30,40)

#**kwargs
def display_info(**details):
    for key,value in details.items():
        print(key,":",value)

display_info(
    name="ragasudha",
    age=20,
    course="cse"
)


#oop concepts

class Student:
    def __init__(self,name,age):
        self.name=name
        self.age=age
    def display(self):
        print("Name:",self.name)
        print("age:",self.age)

student1=Student("raga",20)
student2=Student("pavi",19)
student1.display()
student2.display()
print(student1.name)
print(student2.name)


#inheritance

class Person:
    def __init__(self,name):
        self.name=name
    def introduce(self):
        print("My name is",self.name)
class Student(Person):
    def study(self):
        print(self.name,"is studying")
student=Student("raga")
student.introduce()
student.study()