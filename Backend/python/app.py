import face_recognition
from classifier import predict_external_image
import os
from flask import Flask, flash, request, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import json
from PIL import Image
from pathlib import Path
import torchvision.transforms as transforms
from torchvision.datasets import ImageFolder

from flask import send_file

UPLOAD_FOLDER1 = './uploads'
UPLOAD_FOLDER2 = './p'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'blob'}


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER1'] = UPLOAD_FOLDER1


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

BLUE = 0
ORANGE = 1
GREEN = 2
PURPLE = 3

class Person:
    def __init__(self, name, img):
        self.name = name
        self.img = img
        self.history = [0, 0, 0, 0]

    def add_use(self, color):
        self.history[color] += 1

def print_arry():
    global known_people
    for person in known_people:

        print(person.name, ' ')

@app.route('/uploadProduct', methods=['POST'])
@cross_origin()
def upload_file1():

    # check if the post request has the file part
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']

    # If the user does not select a file, the browser submits an
    # empty file without a filename.
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER1'], filename))
        return predict_external_image(filename)
    return ""


known_people = list()
flag = False

def addManyUses(person, uses_list):
    for use in uses_list:
        person.add_use(use)

def find(encoded_img):
    global known_people
    print_arry()

    print("find: ", len(known_people))
    try:
        for person in known_people:

            index+=1
            img = face_recognition.face_encodings(person.img)[0]
            results = face_recognition.compare_faces([encoded_img], img)
            if True in results:
                return person
    except:
        print("except ")
        return None
    return None


def add_person(person):
    print_arry()
    res = True
    msg = ''
    try:
        validate1 = face_recognition.face_encodings(person.img)[0]
        validate2 = face_recognition.face_encodings(person.img)[0]

        res = face_recognition.compare_faces([validate1], validate2)
        res = True if True in res else False

        if res:
            p = find(encoded_img=validate1)
            if p == None:
                print("in if")
                known_people.append(person)
                print(len(known_people))
            else:
                return {"result": False, "message": "המשתמש כבר קיים במערכת 🙄"}
    except:
        return {"result": False, "message": "תמונה לא תקינה. 🤔 כדאי לנסות שוב"}
    print_arry()
    return {"result": True, "message": '😃המשתמש נוסף בהצלחה'}

def add(name, img):
    p = Person(name, img)
    return add_person(p)

@app.route('/addUser', methods=['POST'])
@cross_origin()
def addUser():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    user = request.form['name']
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER1'], filename))
    image = face_recognition.load_image_file(file)
    return add(user, image)

@app.route('/removeUser', methods=['POST'])
@cross_origin()
def removeUser():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER1'], filename))
    image = face_recognition.load_image_file(file)
    image = face_recognition.face_encodings(image)[0]
    person = find(image)
    if person == None :
        return jsonify("לא הצלחתי למצוא אותך 🙁")
    known_people.remove(person)
    return jsonify("מחקתי אותך מהמשתמשים בהצלחה 🙂")



def add_classification(img, color):
    try:
        print(color, " color")
        encoded_img = face_recognition.face_encodings(img)[0]
        p = find(encoded_img)
        if p != None:
            p.add_use(color)
            return p.name
    except:
        return False
    return False


@app.route('/addClassification', methods=['POST'])
@cross_origin()
def addUse():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    print("file.filename")
    print(file.filename)
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER1'], filename))
    image = face_recognition.load_image_file(file)

    color = request.form['color']
    color = color.lower()
    if color == "blue":
        color = BLUE
    elif color == "orange":
        color = ORANGE
    elif color == "purple":
        color = PURPLE
    else:
        color = GREEN
    return str(add_classification(image, color))


@app.route('/getAll', methods=['GET'])
def index():
    return "Hellow world!"


@app.route('/getHistory', methods=['GET'])
def getHistory():
    history = list()
    for person in known_people:
        my_history = {}
        my_history['name'] = person.name
        my_history['blue'] = person.history[0]
        my_history['orange'] = person.history[1]
        my_history['green'] = person.history[2]
        my_history['purple'] = person.history[3]
        history.append(my_history)
    print(history)
    return jsonify(history)

@app.route('/getImage', methods=['GET'])
def getImages():
    global known_people
    return send_file("111.jpg", mimetype="image/jpeg‏")


@app.route('/loadDB', methods=['GET'])
def loadDB():
    global flag
    global known_people
    if flag:
        return "True"
    flag = "True"

    p2 = Person("אפרת", face_recognition.load_image_file('אפרת.jpg'))
    known_people.append(p2)
    addManyUses(p2, [2,0,2,1,1,3,1])

    return "True"

if __name__ == '__main__':
    app.run()