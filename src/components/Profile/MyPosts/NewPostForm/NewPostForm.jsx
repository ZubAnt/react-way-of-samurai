import {Field, Form, Formik} from "formik";
import styles from './NewPostForm.module.css'

const validateNewPostText = (value) => {
    let error;
    if (!value) {
        error = 'Required';
    }
    return error;
}


const NewPostForm = (props) => {
    return (
        <Formik
            initialValues={{newPostText: ''}}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                props.addPost(values.newPostText)
                setSubmitting(false);
                resetForm();
            }}
        >
            {({errors, touched, isValidating}) => {
                let newPostTextHasErrors = errors.newPostText && touched.newPostText
                return (
                    <Form>
                        <div>
                            <div>
                                <Field
                                    name='newPostText'
                                    component='textarea'
                                    placeholder="Enter your new post"
                                    validate={validateNewPostText}
                                    className={newPostTextHasErrors ? styles.fieldError : null}
                                />
                            </div>
                            {newPostTextHasErrors && <span className={styles.fieldErrorText}>{errors.newPostText}</span>}
                        </div>
                        <div>
                            <button type='submit'>Add posts</button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default NewPostForm
