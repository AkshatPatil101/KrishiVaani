# ml_model.py
import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
from collections import OrderedDict
from efficientnet_pytorch import EfficientNet

# Crop-to-class mapping
CROP_CLASS_MAP = {
    "banana": [
        "banana_cordana",
        "banana_healthy",
        "banana_pestalotiopsis",
        "banana_sigatoka",
    ],
    "rice": [
        "rice_Bacterial Leaf Blight",
        "rice_Brown Spot",
        "rice_Healthy Rice Leaf",
        "rice_Leaf Blast",
        "rice_Leaf scald",
        "rice_Narrow Brown Leaf Spot",
        "rice_Rice Hispa",
        "rice_Sheath Blight",
    ],
    "coconut": [
        "coconut_Bud Root Dropping",
        "coconut_Bud Rot",
        "coconut_Gray Leaf Spot",
        "coconut_Leaf Rot",
        "coconut_Stem Bleeding",
    ],
}

# --- Load model once ---
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
MODEL_PATH = "./trained_multicrop_model-project.pth"
checkpoint = torch.load(MODEL_PATH, map_location=device,weights_only=False)
class_names = checkpoint['class_names']
num_classes = checkpoint['num_classes']
full_state_dict = checkpoint['model_state_dict']

model = EfficientNet.from_name('efficientnet-b4', num_classes=num_classes)
in_features = model._fc.in_features
model._fc = nn.Sequential(OrderedDict([
    ('1', nn.Linear(in_features, 1024)),
    ('2', nn.ReLU()),
    ('3', nn.BatchNorm1d(1024)),
    ('4', nn.Dropout(p=0.5)),
    ('5', nn.Linear(1024, 512)),
    ('6', nn.ReLU()),
    ('7', nn.BatchNorm1d(512)),
    ('8', nn.Dropout(p=0.5)),
    ('9', nn.Linear(512, num_classes))
]))
model.load_state_dict(full_state_dict)
model.to(device)
model.eval()


def predict_from_pil(image: Image.Image, crop_choice=None):

    transform = transforms.Compose([
        transforms.Resize((380, 380)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])
    image_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(image_tensor)

        if crop_choice and crop_choice in CROP_CLASS_MAP:
            valid_classes = CROP_CLASS_MAP[crop_choice]
            valid_indices = [class_names.index(c) for c in valid_classes if c in class_names]
            mask = torch.full_like(outputs, float('-inf'))   # to change predictions percentages according to crop specified
            mask[:, valid_indices] = outputs[:, valid_indices]
            outputs = mask

        probabilities = torch.nn.functional.softmax(outputs, dim=1)

        # Get top-1 prediction
        top_prob, top_idx = torch.topk(probabilities, 1)
        idx = top_idx[0, 0].item()
        prob = top_prob[0, 0].item()
        class_name = class_names[idx]

    return [(class_name, prob)]
