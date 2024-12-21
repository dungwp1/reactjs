import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './TableManageUser.scss'
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}






class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id)
    }
    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }

    render() {
        console.log('check listUsers: ', this.props.listUsers)
        console.log('check usersRedux: ', this.state.usersRedux)
        let arrUsers = this.state.usersRedux;

        return (
            <React.Fragment>
                <table id='TableManageUser'>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Gender</th>
                        <th>Image</th>
                        <th>RoleId</th>
                        <th>PossitionId</th>
                        <th>Action</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                        let imageBase64 = '';
                        if (item.image) {
                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                        }
                        return (
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.gender}</td>
                                <td>
                                    {item.image ? (
                                        <img src={imageBase64} alt="User Avatar" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td>{item.roleId}</td>
                                <td>{item.positionId}</td>
                                <td>
                                    <button className='btn-edit' onClick={() => this.handleEditUser(item)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className='btn-delete' onClick={() => this.handleDeleteUser(item)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (id) => dispatch(actions.fetchDeleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
