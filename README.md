📊 Zewail City University Interactive Sales Dashboard
An interactive and dynamic dashboard developed using Python, Flask, Pandas, Matplotlib, Seaborn, and Plotly, designed to visualize and analyze university sales and enrollment data. The dashboard supports drill-down analysis, tracks various student metrics, and presents key insights for decision-makers.

🚀 Features
✅ Data loading and cleaning using Pandas

✅ SQLite database integration using SQLAlchemy

✅ Flask web server for backend routing and API

✅ Dynamic charts using amCharts 5 (e.g., pie, bar, line charts)

✅ Interactive dashboards visualizing:

Student distribution by Major

Gender breakdown

Popular registered courses

Tuition income over the years

✅ Static visualizations also supported using Matplotlib and Seaborn

📁 Project Structure

Zewail-Dashboard/
│
├── app.py                  # Flask backend and API routes
├── mydata.db               # SQLite database (auto-created from CSV)
├── Final_Updated_University_Dataset.csv   # Input data file
│
├── templates/
│   └── index.html          # Main HTML dashboard template
│
├── static/
│   ├── style.css           # CSS styling
│   ├── script.js           # Chart 1: Majors
│   ├── chart2.js           # Chart 2: Gender
│   ├── grade.js            # Chart 3: Registered Courses
│   └── gpa.js              # Chart 4: Tuition by Year
│
└── README.md               # Project documentation

🧠 Key Skills Demonstrated
Data analysis and transformation using Pandas

Backend API development with Flask

Data storage and querying with SQLite

Visualization with Plotly, Matplotlib, Seaborn, and amCharts

Frontend-backend integration with JSON APIs

🏫 About
Developed as a data visualization project for Zewail City University, this dashboard helps academic staff and analysts understand trends in enrollment, revenue, and course demand.
