from ultralytics import YOLO

# Load the model from Hugging Face
model = YOLO("kendrickfff/waste-classification-yolov8-ken")

# Run inference on an image
results = model("369852.jpg")  # replace with a real image path
results.show()  # shows image with detections
