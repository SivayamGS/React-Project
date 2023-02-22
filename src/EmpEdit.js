import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {

    const myStyle = {
        textAlign: 'left'
    };
    const { empid } = useParams();
    //const[empdata,empdatachange]=useState({})

    useEffect(() => {
        fetch("http://localhost:8000/employee/" + empid)
            .then((res) => { return res.json() })
            .then((resp) => {
                idchange(resp.id);
                namechange(resp.name);
                emailchange(resp.email);
                phonechange(resp.phone);
                Activechange(resp.isActive);
                //empdatachange(resp);
            })
            .catch((err) => { console.log(err.message); })
    }, []);


    const [id, idchange] = useState("");
    const [name, namechange] = useState("");
    const [email, emailchange] = useState("");
    const [phone, phonechange] = useState("");
    const [Active, Activechange] = useState(true);
    const [validation, validationchange] = useState(false);
    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = { id, name, email, phone, Active };


        fetch("http://localhost:8000/employee/" + empid,
            {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(empdata)
            })
            .then((res) => {
                console.log(empdata);
                alert('save successfully')
                navigate('/')
            })
            .catch((err) => { console.log(err.message) })
    }
    return (
        <div className="row">
            <div className="offser-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit} >
                    <div className="card" style={myStyle} >
                        <div className="card-title">
                            <h2>Employee Edit</h2>

                        </div>
                        <div className="card-body">
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input value={name} onMouseDown={e => validationchange(true)} onChange={e => namechange(e.target.value)} className="form-control"></input>
                                        {name.length == 0 && validation && < span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input value={phone} onChange={e => phonechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-check">

                                        <input checked={Active} onChange={e => Activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                        <label className="form-check-label">Is Active</label>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button className="btn btn-success" type="submit">save</button>
                                        <Link to='/' className="btn btn-danger">Back</Link>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>
                </form>

            </div>

        </div>
    );

}
export default EmpEdit;