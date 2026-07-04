
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function CreateCompany() {

const navigate = useNavigate();

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] =
useState("");

const [confirmPassword,
setConfirmPassword] =
useState("");

const handleSubmit =
async (e) => {

e.preventDefault();

if (
password !== confirmPassword
) {

alert(
"Passwords not matching"
);

return;

}

try {

const res =
await axios.post(

"https://test-campus-server.ramchintech.com/company-register",

{
name,
email,
password
}

);

if (
res.data.status ===
"success"
) {

alert(
"Company Registered Successfully"
);

navigate(
"/companies"
);

}

else {

alert(
res.data.message
);

}

}

catch (err) {

console.log(err);

alert(
"Server Error"
);

}

};

return (

<>

<AdminNavbar/>

<div className="container mt-5">

<div className="row justify-content-center">

<div className="col-md-6">

<div
className="card p-4 shadow"
style={{
borderRadius:"20px"
}}
>

<h2
className="text-center mb-4"
>
Register Company
</h2>

<form
onSubmit={
handleSubmit
}
>

<input
className=
"form-control mb-3"

placeholder=
"Company Name"

value={name}

onChange={(e)=>
setName(
e.target.value
)
}

required
/>

<input
type="email"

className=
"form-control mb-3"

placeholder=
"Email"

value={email}

onChange={(e)=>
setEmail(
e.target.value
)
}

required
/>

<input
type="password"

className=
"form-control mb-3"

placeholder=
"Password"

value={password}

onChange={(e)=>
setPassword(
e.target.value
)
}

required
/>

<input
type="password"

className=
"form-control mb-4"

placeholder=
"Confirm Password"

value={
confirmPassword
}

onChange={(e)=>
setConfirmPassword(
e.target.value
)
}

required
/>

<button
className=
"btn btn-success w-100"
>

Register Company

</button>

</form>

</div>

</div>

</div>

</div>

</>

);

}

export default CreateCompany;


