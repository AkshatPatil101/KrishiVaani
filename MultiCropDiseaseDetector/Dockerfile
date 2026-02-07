# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt .

# Install PyTorch and Torchvision for CPU from the official source
RUN pip install --no-cache-dir torch==2.8.0 torchvision --index-url https://download.pytorch.org/whl/cpu

# Install the rest of the packages from your requirements file
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application's code
COPY . .

# Command to run the application
CMD ["gunicorn", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:10000", "main:app"]
