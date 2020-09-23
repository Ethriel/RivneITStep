import React from 'react';
import './add-group.css';

class AddGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    nameChanged = (ev) => {
        const name = ev.target.value;
        this.setState({
            name: name
        });
    };

    addGroup = (ev) => {
        this.props.addGroup(this.state.name);
    }
    render() {
        return (
            <div className="container">
                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control-plaintext" placeholder="Enter group name" onChange={this.nameChanged} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <input type="button" className="btn btn-primary" value="Add" onClick={this.addGroup} />
                    </div>
                </form>
            </div>
        )
    }

};

export default AddGroup;