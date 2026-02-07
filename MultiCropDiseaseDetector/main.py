from fastapi import FastAPI, UploadFile, File, Form
from PIL import Image
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware

from pth_model import predict_from_pil  # get predict function

app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# post function with image_file and crop_choice in body of post request
@app.post("/predict/")
async def predict_disease(
    image_file: UploadFile = File(...),
    crop_choice: str = Form(None)  # optional - rice/banana/coconut/auto   (if empty or invalid defaults to auto)
):
    try:
        # read uploaded file into PIL Image
        contents = await image_file.read()
        image = Image.open(BytesIO(contents)).convert("RGB")

        # Normalize crop_choice
        if crop_choice:
            crop_choice = crop_choice.strip().lower()
        # Valid crops
        valid_crops = ["rice", "banana", "coconut"]
        if crop_choice not in valid_crops:
            crop_choice = None  # auto mode

        # call ml function
        predictions = predict_from_pil(image, crop_choice=crop_choice)

        # give the json result
        return {
            "filename": image_file.filename,
            "predictions": [
                {"class": cls, "confidence": f"{conf:.2%}"}
                for cls, conf in predictions
            ]
        }

    except Exception as e:
        return {"error": str(e)}