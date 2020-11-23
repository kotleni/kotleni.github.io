from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    passw = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

db.drop_all() # Удалить все
db.create_all() # Создать все
# Getting data
#print('! Введите данные !')
#username = input('username: ')
#email = input('email: ')
#passw = input('password: ')

# Adding new user
#user = User(username=username, email=email, passw=passw)
#db.session.add(user)
#db.session.commit()

# Listing users (emails)
users = User.query.all()
for user in users:
    print(user)
