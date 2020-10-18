import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form } from '../common/FormsControls/FormsControls'
import { required, maxLengthCreator } from '../common/utils/validators'
import s from '../login/login.module.css'
import { NavLink } from 'react-router-dom'
import { Button } from '../common/btn/btn'

const RegisterPage = (props) => {

    return (
        <div>
            <div> 
            <div><Button><NavLink to={'/login'}>To Login Page</NavLink></Button></div>
                <Register onSubmit={props.addNewUser} />
            </div>
        </div>
    );
}

const maxLength25 = maxLengthCreator(25)

const RegisterForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.loginWrapper}>
                <div className={s.login}>
                    <div className={s.loginInner}>
                        Register Form
                        <div><Field name={'login'} component={Form} placeholder={'Email @ required'}
                            validate={[required, maxLength25]} type='input' /></div>
                        <div><Field name={'password'} component={Form} placeholder={'Password'}
                            validate={[required, maxLength25]} type='password' /></div>
                        <Button>Register</Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

const Register = reduxForm({ form: 'Register' })(RegisterForm)



export default RegisterPage