from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mysql.connector
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Folder for uploads
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Create uploads directory if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Database configuration
db_config = {
    "host": "2a02:4780:12:f6a7::1",
    "user": "schoolAttendance",
    "password": "Sensarsoft@123",
    "database": "campusconnect",
    "port": 3306
}

def get_db_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        print("✅ Database Connected Successfully")
        return conn
    except mysql.connector.Error as err:
        print("❌ Database Connection Error:", err)
        raise

# Basic route
@app.route("/")
def home():
    return "Server Running"

# ==========================
# STUDENT LOGIN
# ==========================
@app.route('/login', methods=['POST'])
def student_login():
    conn = None
    cursor = None

    try:
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM students WHERE email=%s AND password=%s",
            (email, password)
        )

        student = cursor.fetchone()

        if student:
            return jsonify({
                "status": "success",
                "student": student
            })

        return jsonify({
            "status": "failure",
            "message": "Invalid Email or Password"
        })

    except Exception as e:
        print("LOGIN ERROR:", e)
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# ==========================
# STUDENT REGISTER
# ==========================
@app.route('/register', methods=['POST'])
def student_register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    course = data.get('course')
    password = data.get('password')
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO students (name, email, course, password)
            VALUES (%s, %s, %s, %s)
            """,
            (name, email, course, password)
        )
        conn.commit()
        return jsonify({"status": "success"})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)})
    finally:
        cursor.close()
        conn.close()

# ==========================
# COMPANY LOGIN
# ==========================
@app.route('/company-login', methods=['POST'])
def company_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT * FROM companies WHERE email=%s AND password=%s",
        (email, password)
    )
    company = cursor.fetchone()
    cursor.close()
    conn.close()
    if company:
        return jsonify({
            "status": "success",
            "company": {
                "id": company["id"],
                "name": company["name"],
                "email": company["email"]
            }
        })
    return jsonify({"status": "failure", "message": "Invalid Email or Password"})

# ==========================
# COMPANY REGISTER
# ==========================
@app.route('/company-register', methods=['POST'])
def company_register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            """
            INSERT INTO companies (name, email, password)
            VALUES (%s, %s, %s)
            """,
            (name, email, password)
        )
        conn.commit()
        return jsonify({"status": "success"})
    except mysql.connector.Error as err:
        return jsonify({"status": "error", "message": str(err)})
    finally:
        cursor.close()
        conn.close()

# ==========================
# GET ALL JOBS
# ==========================
@app.route('/jobs', methods=['GET'])
def get_jobs():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM jobs")
    jobs = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(jobs)

# ==========================
# POST NEW JOB
# ==========================
@app.route('/post-job', methods=['POST'])
def post_job():
    data = request.get_json()

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO jobs
        (company_id, company_name, job_role, location, package, skills_required, description, deadline, status, remaining_positions)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,'Active',10)
    """,
    (
        data.get('company_id'),
        data.get('company_name'),
        data.get('job_role'),
        data.get('location'),
        data.get('package'),
        data.get('skills_required'),
        data.get('description'),
        data.get('deadline')
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"status": "success"})

# ==========================
# UPDATE STUDENT PROFILE
# ==========================
@app.route('/update-student', methods=['POST'])
def update_student():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        UPDATE students
        SET name=%s, email=%s, course=%s, phone=%s, address=%s, skills=%s, cgpa=%s
        WHERE id=%s
        """,
        (
            data.get('name'),
            data.get('email'),
            data.get('course'),
            data.get('phone'),
            data.get('address'),
            data.get('skills'),
            data.get('cgpa'),
            data.get('id')
        )
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"status": "success"})

# ==========================
# New: Company Dashboard Stats
# ==========================
@app.route('/company-dashboard-stats')
def company_dashboard_stats():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS total_jobs FROM jobs")
    total_jobs = cursor.fetchone()['total_jobs']

    cursor.execute("SELECT COUNT(*) AS active_jobs FROM jobs WHERE status='Active'")
    active_jobs = cursor.fetchone()['active_jobs']

    cursor.execute("SELECT IFNULL(SUM(remaining_positions),0) AS available_positions FROM jobs WHERE status='Active'")
    available_positions = cursor.fetchone()['available_positions']

    cursor.execute("SELECT COUNT(*) AS applications FROM applications")
    applications = cursor.fetchone()['applications']

    cursor.execute("SELECT COUNT(*) AS selected_students FROM applications WHERE status='Selected'")
    selected_students = cursor.fetchone()['selected_students']

    cursor.close()
    conn.close()

    return jsonify({
        "total_jobs": total_jobs,
        "active_jobs": active_jobs,
        "available_positions": available_positions,
        "applications": applications,
        "selected_students": selected_students
    })

# ==========================
# APPLY FOR A JOB
# ==========================
@app.route('/apply-job', methods=['POST'])
def apply_job():
    try:
        data = request.get_json()

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        # Get student's uploaded resume
        cursor.execute(
            "SELECT resume FROM students WHERE id=%s",
            (data["student_id"],)
        )
        student = cursor.fetchone()

        resume = None
        if student:
            resume = student["resume"]

        cursor.execute("""
            INSERT INTO applications
            (
                student_id,
                name,
                email,
                course,
                cgpa,
                job_role,
                company_name,
                company_id,
                status,
                job_id,
                resume,
                resume_viewed
            )
            VALUES
            (%s,%s,%s,%s,%s,%s,%s,%s,'Pending',%s,%s,'No')
        """, (
            data["student_id"],
            data["name"],
            data["email"],
            data["course"],
            data["cgpa"],
            data["job_role"],
            data["company_name"],
            data["company_id"],
            data["job_id"],
            resume
        ))

        conn.commit()

        return jsonify({
            "status": "success"
        })

    except Exception as e:
        conn.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        })

    finally:
        cursor.close()
        conn.close()



# ==========================
# delete-job
# ==========================
@app.route('/delete-job/<int:id>', methods=['DELETE'])
def delete_job(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM jobs WHERE id=%s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"status": "success"})



# ==========================
# update-status with notification logic
# ==========================
@app.route('/update-status', methods=['POST'])
def update_status():

    try:

        data=request.get_json()

        application_id=data["application_id"]
        status=data["status"]

        conn=get_db_connection()
        cursor=conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT
            application_id,
            status,
            email,
            job_id,
            job_role
            FROM applications
            WHERE application_id=%s
        """,(application_id,))

        app_data=cursor.fetchone()

        if not app_data:
            return jsonify({"error":"Application not found"}),404

        old_status=app_data["status"]

        cursor.execute("""
            UPDATE applications
            SET status=%s
            WHERE application_id=%s
        """,(status,application_id))

        if old_status!="Selected" and status=="Selected":

            cursor.execute("""
                UPDATE jobs
                SET remaining_positions=remaining_positions-1
                WHERE id=%s
                AND remaining_positions>0
            """,(app_data["job_id"],))

            cursor.execute("""
                UPDATE jobs
                SET status='Closed'
                WHERE id=%s
                AND remaining_positions<=0
            """,(app_data["job_id"],))

        if status=="Selected":
            msg=f"Selected for {app_data['job_role']}"

        elif status=="Shortlisted":
            msg=f"Shortlisted for {app_data['job_role']}"

        else:
            msg=f"Rejected for {app_data['job_role']}"

        cursor.execute("""
            UPDATE students
            SET notification=%s
            WHERE email=%s
        """,(msg,app_data["email"]))

        conn.commit()

        return jsonify({
            "status":"success"
        })

    except Exception as e:
        conn.rollback()
        return jsonify({"error":str(e)})

    finally:
        cursor.close()
        conn.close()

# ==========================
# GET student messages
# ==========================
@app.route("/student-messages/<email>")
def student_messages(email):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT * FROM notifications WHERE student_email=%s ORDER BY created_at DESC",
            (email,)
        )
        messages = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify(messages)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================
# Resume Upload
# ==========================
@app.route("/upload-resume", methods=["POST"])
def upload_resume():
    file = request.files.get("resume")
    student_id = request.form.get("student_id")
    if not file:
        return jsonify({"error": "No file"})
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        UPDATE students
        SET resume=%s
        WHERE id=%s
        """,
        (filename, student_id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Resume Uploaded", "resume": filename})

# Resume retrieval
@app.route("/resume/<filename>")
def get_resume(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)

# ==========================
# Resume viewed endpoint
# ==========================
@app.route("/resume-viewed", methods=["POST"])
def resume_viewed():
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        """
        UPDATE applications
        SET resume_viewed='Yes'
        WHERE application_id=%s
        """,
        (data["application_id"],)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"status":"success"})

# ==========================
# Delete application
# ==========================
@app.route("/delete-application/<int:id>", methods=["DELETE"])
def delete_application(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "DELETE FROM applications WHERE application_id=%s",
        (id,)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"status":"success"})

# ==========================
# Student applications
# ==========================
@app.route("/student-applications/<int:student_id>")
def student_applications(student_id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT a.*, j.company_name
        FROM applications a
        JOIN jobs j ON a.job_id = j.id
        WHERE a.student_id = %s
        ORDER BY a.application_id DESC
    """, (student_id,))

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)
    
# ==========================
# Company Dashboard
# ==========================
@app.route("/company-dashboard/<int:company_id>")
def company_dashboard(company_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT COUNT(*) AS jobs FROM jobs WHERE company_id=%s",
        (company_id,)
    )
    jobs = cursor.fetchone()

    cursor.execute(
        """
        SELECT COUNT(*) AS applications
        FROM applications
        WHERE company_id=%s
        """,
        (company_id,)
    )
    applications = cursor.fetchone()

    cursor.execute(
        """
        SELECT COUNT(*) AS selected
        FROM applications
        WHERE company_id=%s
        AND status='Selected'
        """,
        (company_id,)
    )
    selected = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify({
        "jobs": jobs["jobs"],
        "applications": applications["applications"],
        "selected": selected["selected"]
    })
#company applicant
@app.route("/company-applicants/<int:company_id>")
def company_applicants(company_id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
            a.application_id,
            a.student_id,
            a.name,
            a.email,
            a.course,
            a.cgpa,
            a.job_role,
            a.company_name,
            a.status,
            a.resume,
            a.resume_viewed,
            a.job_id,
            a.company_id
        FROM applications a
        WHERE a.company_id = %s
        ORDER BY a.application_id DESC
    """, (company_id,))

    applicants = cursor.fetchall()

    print("Company:", company_id)
    print("Applicants:", applicants)

    cursor.close()
    conn.close()

    return jsonify(applicants)

#MANAGE JOBS
@app.route("/manage-jobs/<int:company_id>")
def manage_jobs(company_id):

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM jobs
        WHERE company_id = %s
    """, (company_id,))

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)


# ==========================
# ADMIN LOGIN
# ==========================
@app.route("/admin-login", methods=["POST"])
def admin_login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if email == "admin@gmail.com" and password == "admin123":
        return jsonify({
            "status": "success",
            "admin": {
                "name": "CampusConnect Admin"
            }
        })

    return jsonify({
        "status": "failure"
    })


# ==========================
# ADMIN DASHBOARD
# ==========================
@app.route("/admin-dashboard")
def admin_dashboard():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT COUNT(*) total_students FROM students"
    )
    students = cursor.fetchone()

    cursor.execute(
        "SELECT COUNT(*) total_companies FROM companies"
    )
    companies = cursor.fetchone()

    cursor.execute(
        "SELECT COUNT(*) total_jobs FROM jobs"
    )
    jobs = cursor.fetchone()

    cursor.execute(
        "SELECT COUNT(*) total_applications FROM applications"
    )
    applications = cursor.fetchone()

    cursor.close()
    conn.close()

    return jsonify({
        "students": students["total_students"],
        "companies": companies["total_companies"],
        "jobs": jobs["total_jobs"],
        "applications": applications["total_applications"]
    })


# ==========================
# ADMIN STUDENTS
# ==========================
@app.route("/admin-students")
def admin_students():

    conn = get_db_connection()

    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
        id,
        name,
        email,
        course,
        cgpa
        FROM students
    """)

    data = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(data)


# ==========================
# ADMIN COMPANIES
# ==========================
@app.route('/admin-companies', methods=['GET'])
def admin_companies():

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
    SELECT
        c.id,
        c.name,

        (
            SELECT COUNT(*)
            FROM applications a
            WHERE a.company_name = c.name
        ) AS total_applications,

        (
            SELECT COUNT(*)
            FROM jobs j
            WHERE j.company_name = c.name
        ) AS available_jobs,

        (
            SELECT GROUP_CONCAT(
                DISTINCT j.location
                SEPARATOR ', '
            )
            FROM jobs j
            WHERE j.company_name = c.name
        ) AS locations

    FROM companies c
    ORDER BY c.id
    """

    cursor.execute(query)

    companies = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(companies)

# ==========================
# DELETE COMPANY
# ==========================
@app.route(
    "/delete-company/<int:id>",
    methods=["DELETE"]
)
def delete_company(id):

    conn = get_db_connection()

    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM companies WHERE id=%s",
        (id,)
    )

    conn.commit()

    cursor.close()

    conn.close()

    return jsonify({
        "status": "success"
    })


# ==========================
# ADMIN JOBS
# ==========================
@app.route("/admin-jobs")
def admin_jobs():

    conn = get_db_connection()

    cursor = conn.cursor(
        dictionary=True
    )

    cursor.execute("""
        SELECT
        id,
        company_name,
        job_role,
        location,
        package,
        remaining_positions,
        status
        FROM jobs
        ORDER BY id DESC
    """)

    data = cursor.fetchall()

    cursor.close()

    conn.close()

    return jsonify(data)

    # ==========================
# ADMIN APPLICATIONS
# ==========================
@app.route("/admin-applications")
def admin_applications():

    conn = get_db_connection()

    cursor = conn.cursor(
        dictionary=True
    )

    cursor.execute("""
        SELECT
        application_id,
        name,
        email,
        company_name,
        job_role,
        status,
        resume_viewed
        FROM applications
        ORDER BY application_id DESC
    """)

    data = cursor.fetchall()

    cursor.close()

    conn.close()

    return jsonify(data)
    


# KEEP THIS LAST
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)