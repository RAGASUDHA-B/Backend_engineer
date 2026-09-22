from fastapi import FastAPI,uploadFile,File
app=FastAPI()
@app.post("/upload/")
async def upload_file(file:UploadFile=File())