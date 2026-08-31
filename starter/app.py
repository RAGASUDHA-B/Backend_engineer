from fastapi import FastAPI, UploadFile, File
app = FastAPI()
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    with open(file.filename, "wb") as f:
        content = await file.read()
        f.write(content)
    return {"message": "File uploaded successfully"}