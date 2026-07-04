import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import AdminNavbar from "./AdminNavbar";

function Students() {

const [students,setStudents]=useState([]);

useEffect(()=>{

fetchStudents();

},[]);

const fetchStudents=()=>{

axios
.get(
"https://test-campus-server.ramchintech.com/admin-students"
)

.then((res)=>{

setStudents(res.data);

})

.catch((err)=>{

console.log(err);

alert("Failed to load students");

});

};

return(

<>

<AdminNavbar/>

<div className="container mt-4">

<div className="text-center mb-4">

<h1 className="fw-bold">
Students Management
</h1>

<p className="text-muted">
View all registered students
</p>

</div>

<div className="card shadow">

<div className="card-header bg-primary text-white">

<h4>
Total Students : {students.length}
</h4>

</div>

<div className="card-body">

<div className="table-responsive">

<table className="table table-bordered table-hover">

<thead className="table-dark">

<tr>

<th>ID</th>

<th>Name</th>

<th>Email</th>

<th>Course</th>

<th>Phone</th>

<th>Skills</th>

<th>CGPA</th>

<th>Resume</th>

</tr>

</thead>

<tbody>

{students.length===0 ? (

<tr>

<td
colSpan="8"
className="text-center"
>
No Students Found
</td>

</tr>

):(

students.map((student)=>(

<tr key={student.id}>

<td>
{student.id}
</td>

<td>
{student.name}
</td>

<td>
{student.email}
</td>

<td>
{student.course}
</td>

<td>
{student.phone || "-"}
</td>

<td>
{student.skills || "-"}
</td>

<td>
{student.cgpa || "-"}
</td>

<td>

{student.resume ? (

<a
href={`https://test-campus-server.ramchintech.com/resume/${student.resume}`}
target="_blank"
rel="noreferrer"
className="btn btn-success btn-sm"
>

View Resume

</a>

):(

"No Resume"

)}

</td>

</tr>

))

)}

</tbody>

</table>

</div>

</div>

</div>

</div>

</>

);

}

export default Students;