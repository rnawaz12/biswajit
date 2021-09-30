import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormHeader from '../../UI/organisms/FormHeader';
import Topbar from '../../UI/organisms/Topbar';
import ApiService from '../../../helpers/ApiServices';


const formHeader = {
    title: "Custom List",
    buttonList: [
        {
            id: 1,
            name: "Save",
            type: "submit",
            variant: "primary",
            handler: "",
            linkTo: "/lists/add"
        },
        {
            id: 2,
            name: "Cancel",
            type: "button",
            variant: "secondary",
            handler: "",
            linkTo: "/lists/add"
        }
    ]
}

export default function AddEditLists() {
    const [user, setUser] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    let _id = 2;

    const loc = useLocation().pathname;
    console.log(loc.split('/')[3]);
    const isAddMode = !loc.split('/')[3];
    if (!isAddMode) {
        _id = loc.split('/')[3];
    }
    console.log(isAddMode);
    console.log(loc)

    // 1. Form validation rules 
    const validationSchema = Yup.object().shape({
        isActive: Yup.string()
            .required('Title is required'),
        name: Yup.string()
            .required('First Name is required'),
        description: Yup.string()
            .required('Last Name is required'),
        ListId: Yup.string()
            .required('ListId is required')
    });

    // 2. Functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, formState: { errors }, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });


    function onSubmit(data) {
        return isAddMode
            ? createUser(data)
            : updateUser(_id, data);
    }

    function createUser(data) {
        console.log(data);
        // return userService.create(data)
        //     .then(() => {
        //         alertService.success('User added', { keepAfterRouteChange: true });
        //         history.push('.');
        //     })
        //     .catch(alertService.error);
    }

    function updateUser(id, data) {
        console.log(id, data)
        // return userService.update(id, data)
        //     .then(() => {
        //         alertService.success('User updated', { keepAfterRouteChange: true });
        //         history.push('..');
        //     })
        //     .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {


            // get user and set form fields
            ApiService.get('list/6151b37465f5f4649c006c17').then(el => {
                const fields = ['isActive', 'name', 'description', 'ListId'];
                fields.forEach(field => setValue(field, el.data.document[field]));
                console.log(el.data.document)
                setUser(el.data.document);
                console.log(user)



            });

        }
    }, []);





















    return (
        <div className="addEditLists">
            <Topbar />
            <FormHeader formHeader={formHeader} />


            <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
                <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
                <div className="form-row">
                    <div className="form-group col">
                        <label>Title</label>
                        <select name="isActive" {...register("isActive")} className={`form-control ${errors.isActive ? 'is-invalid' : ''}`}>
                            <option value=""></option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Miss">Miss</option>
                            <option value="Ms">Ms</option>
                        </select>
                        <div className="invalid-feedback">{errors.isActive?.message}</div>
                    </div>
                    <div className="form-group col-5">
                        <label>First Name</label>
                        <input name="name" type="text" {...register("name")} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.name?.message}</div>
                    </div>
                    <div className="form-group col-5">
                        <label>Last Name</label>
                        <input name="description" type="text" {...register("description")} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.description?.message}</div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-7">
                        <label>ListId</label>
                        <input name="ListId" type="text" {...register("ListId")} className={`form-control ${errors.ListId ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.ListId?.message}</div>
                    </div>
                    <div className="form-group col">
                        <label>Role</label>
                        <select name="role" {...register("role")} className={`form-control ${errors.role ? 'is-invalid' : ''}`}>
                            <option value=""></option>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <div className="invalid-feedback">{errors.role?.message}</div>
                    </div>
                </div>
                {!isAddMode &&
                    <div>
                        <h3 className="pt-3">Change Password</h3>
                        <p>Leave blank to keep the same password</p>
                    </div>
                }
                <div className="form-row">
                    <div className="form-group col">
                        <label>
                            Password
                            {!isAddMode &&
                                (!showPassword
                                    ? <span> - <a onClick={() => setShowPassword(!showPassword)} className="text-primary">Show</a></span>
                                    : <em> - {user.password}</em>
                                )
                            }
                        </label>
                        <input name="password" type="password" {...register("password")} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div className="form-group col">
                        <label>Confirm Password</label>
                        <input name="confirmPassword" type="password" {...register("confirmPassword")} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Save
                    </button>
                    <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                </div>
            </form>



        </div>
    )
}
