import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

function Companies() {

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

alert("Cannot load company stats");

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
navigate(
"/create-company"
)
}

>

Create Company </button>

</div>

<div className="row">

{companies.map((c)=>(

<div
className="col-md-4 mb-4"
key={c.id}
>

<div
className="card shadow p-4"
style={{
borderRadius:"20px"
}}
>

<h4 className="text-primary">
{c.name}
</h4>

<hr/>

<p>
Total Jobs:
<b>
 {c.total_jobs}
</b>
</p>

<p>
Applicants:
<b>
 {c.total_applications}
</b>
</p>

<p>
Selected:
<b>
 {c.selected}
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
