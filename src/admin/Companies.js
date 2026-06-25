import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

function Companies(){

const [companies,setCompanies]=useState([]);

const navigate=useNavigate();

useEffect(()=>{
fetchCompanies();
},[]);

const fetchCompanies=async()=>{

try{

const res=
await axios.get(
"http://localhost:5000/admin-companies"
);

setCompanies(res.data);

}

catch(err){

console.log(err);

alert("Cannot load companies");

}

};

return(

<>

<AdminNavbar/>

<div className="container mt-4">

<div className="d-flex justify-content-between mb-4">

<h2>
Company Overview
</h2>

<button
className="btn btn-success"
onClick={()=>
navigate("/create-company")
}
>
Create Company
</button>

</div>

<div className="row">

{companies.map((c)=>(

<div
className="col-md-4 mb-4"
key={c.id}
>

<div
className="card p-4 shadow"
style={{
borderRadius:"20px"
}}
>

<h3 className="text-primary">
{c.name}
</h3>

<hr/>

<p>
Applicants:
<b>
 {c.total_applications}
</b>
</p>

<p>
Available Location:
<b>
 {" "}
{c.locations || "No jobs posted"}
</b>
</p>

<p>
Available Jobs:
<b className="text-success">
 {c.available_jobs}
</b>
</p>

</div>

</div>

))}

</div>

</div>

</>

);

}

export default Companies;