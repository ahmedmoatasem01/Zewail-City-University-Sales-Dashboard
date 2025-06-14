from flask import Flask, jsonify, render_template
import sqlite3
import pandas as pd
from sqlalchemy import create_engine

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except:
        print("db not exist")
    
    return conn


df = pd.read_csv("Final_Updated_University_Dataset.csv")
# print(df)
con = create_connection("mydata.db")

df.to_sql('university', con, if_exists='replace')
con.close()

db_url = 'sqlite:///mydata.db'
engine = create_engine(db_url, echo= True)
df_2 = pd.read_sql('select * from university', engine)
print(df_2)

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")
# chart 1
@app.route("/get-datachart")
def get_datachart():
    major_counts = df["Major"].value_counts()
    data = [{"class": major, "value": count} for major, count in major_counts.items()]
    return jsonify(data)
# chart 2
@app.route("/get-datatable")
def get_datatable():
    classes = df["Gender"].value_counts().index
    values = df["Gender"].value_counts().values
    datab = [{"class": classes[i], "value": int(values[i])} for i in range(len(classes))]
    return jsonify(datab)
# chart 3
@app.route("/get-datagrade")
def get_datagrade():

    classes = df["Registered_Course"].value_counts().tail(5).index
    values = df["Registered_Course"].value_counts().tail(5).values
    data = []
    for i in range(len(classes)):
        data.append({"class": classes[i], "value": int(values[i])})
    return jsonify(data)

#chart 4
@app.route("/get-datagpa")
def get_datatuition():
    tuition_data = (
        df.groupby("Enrollment_Year")["Tuition_Fee_Income"].sum().reset_index()
    )
    
    data = [
        {"year": int(row["Enrollment_Year"]), "value": int(row["Tuition_Fee_Income"])}
        for _, row in tuition_data.iterrows()
    ]
    
    return jsonify(data)


if __name__ == "__main__":
    app.run(debug=True)

