from fastapi import FastAPI
from pydantic import BaseModel
app=FastAPI()
class Item(BaseModel):
    name:str
    price:float
items={}

@app.post("/items")
async def create_item(item:Item):
    item_id=len(items)+1
    items[item_id]=item
    return{"id":item_id,"item":item}

@app.get("/items/{item_id}")
async def read_item(item:Item,item_id:int):
    return items.get(item_id,{"error":"Items not found"})

@app.put("/items/{item_id}")
async def update_item(item:Item,item_id:int):
    if item_id in items:
        items[item_id]=item
        return{"message":"upaddated","item":item}
    return{"item":"item not found"}
@app.delete("/item/{item_id}")
async def delete_item(item_id:int):
    if item_id in items:
        deleted_item=items.pop(item_id)
        return{"message":"deleted item","item":deleted_item}
    return{"error":"item not found"}