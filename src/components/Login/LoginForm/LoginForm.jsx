import {Form, Formik} from "formik";
import * as Yup from "yup";
import {Button, Checkbox, TextField} from "@mui/material";
import {useState} from "react";

const LoginFormSchema = Yup.object().shape({
    email: Yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: Yup
        .string('Enter your password')
        .min(4, 'Password should be of minimum 4 characters length')
        .required('Password is required'),
});

const LoginForm = (props) => {

    const [captchaUrl, setCaptchaUrl] = useState('')

    return (
        <Formik
            initialValues={{email: '', password: '', rememberMe: true, captcha: undefined}}
            onSubmit={(values, {setSubmitting, resetForm, setErrors}) => {
                props.login(
                    values.email,
                    values.password,
                    values.rememberMe,
                    values.captcha,
                ).then((data) => {
                    if (data.resultCode === 0) {
                        setSubmitting(false);
                        resetForm();
                    } else {
                        console.log('handle error', data.messages)
                        setErrors({email: data.messages.length > 0 ? data.messages[0]: "Some error"})
                        setSubmitting(false);

                        if (data.resultCode === 10) {
                            props.getCaptchaUrl().then(
                                (url) => {setCaptchaUrl(url)}
                            )
                        }
                    }
                })
            }}
            validationSchema={LoginFormSchema}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
              }) => {

                return (
                    <Form>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email ? errors.email : ''}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password ? errors.password : ''}
                        />
                        <Checkbox
                            size="small"
                            id="rememberMe"
                            name="rememberMe"
                            label="rememberMe"
                            checked={values.rememberMe}
                            onChange={handleChange}
                        />
                        <div>
                        {captchaUrl
                            ? <img src={captchaUrl}/>
                            : <div></div>
                        }
                        </div>
                        {captchaUrl
                            ? <TextField
                                fullWidth
                                id="captcha"
                                name="captcha"
                                label="captcha"
                                type="captcha"
                                value={values.captcha}
                                onChange={handleChange}
                                error={touched.captcha && Boolean(errors.captcha)}
                                helperText={touched.captcha ? errors.captcha : ''}
                            />
                            : <div></div>
                        }


                        <Button id="loginBtn" color="primary" variant="contained" fullWidth type="submit">
                            Login
                        </Button>
                    </Form>
                )
            }}

        </Formik>
    )
}
export default LoginForm
