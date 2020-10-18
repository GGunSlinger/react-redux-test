import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form } from '../common/FormsControls/FormsControls'
import { required, maxLengthCreator } from '../common/utils/validators'
import s from './login.module.css'
import { NavLink } from 'react-router-dom'
import { Button } from '../common/btn/btn'


const Login = (props) => {

    return <div>
        <div><Button><NavLink to={'/registerpage'}>To Register Page</NavLink></Button></div>
        <LoginAuth onSubmit={props.UserLogin} />
    </div>

}


const maxLength25 = maxLengthCreator(25)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.loginWrapper}>
                <div className={s.login}>
                    <div className={s.loginInner}>
                        Login Form
                        <div>
                            <Field name={'login'} component={Form} placeholder={'Email'}
                                validate={[required, maxLength25]} type='input' />
                        </div>
                        <div>
                            <Field name={'password'} component={Form} placeholder={'Password'}
                                validate={[required, maxLength25]} type='password' />
                        </div>
                        <Button>Login</Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

const LoginAuth = reduxForm({ form: 'Login' })(LoginForm)

export default Login