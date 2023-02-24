import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import styles from './NewMessage.module.css'


const NewMessageFormSchema = Yup.object().shape({
    newMessageBody: Yup.string()
        .min(5, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});


const NewMessageForm = (props) => {
    return (
        <Formik
            initialValues={{newMessageBody: ''}}
            onSubmit={(values, {setSubmitting, resetForm}) => {
                props.sendMessage(values.newMessageBody)
                setSubmitting(false);
                resetForm();
            }}
            validationSchema={NewMessageFormSchema}
        >
            {
                ({errors, touched}) => {
                    const newMessageBodyHasErrors = errors.newMessageBody && touched.newMessageBody

                    return (
                        <Form>
                            <div>
                                <Field
                                    name='newMessageBody'
                                    component='textarea'
                                    placeholder="Enter your message"
                                />
                                {
                                    newMessageBodyHasErrors && <div className={styles.fieldErrorText}>{errors.newMessageBody}</div>
                                }
                            </div>
                            <div>
                                <button type='submit'>Send</button>
                            </div>
                        </Form>
                    )
                }
            }

        </Formik>
    )
}

export default NewMessageForm
