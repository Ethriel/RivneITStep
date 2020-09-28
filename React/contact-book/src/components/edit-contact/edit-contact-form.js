import React from 'react';

const EditContactForm = ({ setName, setPhone, setEmail, setAddress, setGender, setAvatar, submitClick, contact }, ...props) => {
    return (
        <form>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control-plaintext" placeholder="Enter name" onChange={setName} value={contact.name} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control-plaintext" placeholder="Enter email" onChange={setEmail} value={contact.email} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Phone</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control-plaintext" placeholder="Enter phone" onChange={setPhone} value={contact.phone} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control-plaintext" placeholder="Enter address" onChange={setAddress} value={contact.address} />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Gender</label>
                <div className="col-sm-10">
                    <select className="form-control" onChange={setGender}>
                        <option></option>
                        <option value="men" defaultValue>Male</option>
                        <option value="women">Female</option>
                    </select>
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Avatar</label>
                <div className="col-sm-10">
                    <input type="number" min={1} max={99} className="form-control-plaintext" placeholder="Avatar number" onChange={setAvatar} value={contact.avatar} />
                </div>
            </div>

            <div className="form-group row">
                <input type="button" className="btn btn-primary" onClick={submitClick} value="Submit" />
            </div>

        </form>
    )
}

export default EditContactForm;