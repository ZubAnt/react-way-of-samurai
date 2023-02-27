import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import avatar from '../../../assets/images/avatar.png'
import {useState} from "react";
import {Form, Formik} from "formik";
import {Button, Checkbox, TextField} from "@mui/material";


const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState(false, [props.profile]);

    if (!props.profile) {
        return <Preloader/>
    }


    const isOwner = props.me ? props.profile.userId === props.me.id : false

    const onMainPhotoSelected = (e) => {
        props.savePhoto(e.target.files[0])
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || avatar}/>
                {isOwner ? <input type="file" onChange={onMainPhotoSelected}/> : ''}

                {editMode && isOwner
                    ? <ProfileDataForm
                        profile={props.profile}
                        setEditMode={setEditMode}
                        saveProfile={props.saveProfile}
                    />
                    : <ProfileData
                        profile={props.profile}
                        setEditMode={setEditMode}
                        isOwner={isOwner}
                    />
                }

                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                    canEdit={isOwner}
                />
            </div>
        </div>
    )
}

const ProfileData = ({profile, setEditMode, isOwner}) => {
    return (
        <div>
            <div>
                Fullname: {profile.fullName}
            </div>

            <div>
                <h6>{profile.aboutMe}</h6>
            </div>

            <div>
                Looking for a job: {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            <div>
                My professional skills: {profile.lookingForAJobDescription}
            </div>


            <div>
                <b>Contacts:</b>
                {Object.keys(profile.contacts).map((key) => {
                    return <div key={key} className={s.contactItem}>{key}: {profile.contacts[key]} </div>
                })}
            </div>

            {isOwner? <button onClick={() => setEditMode(true)}>Edit</button>: <div/>}

        </div>
    )
}

const ProfileDataForm = ({profile, setEditMode, saveProfile}) => {
    return (
        <Formik
            initialValues={{
                fullName: profile.fullName,
                aboutMe: profile.aboutMe,
                lookingForAJob: Boolean(profile.lookingForAJob),
                lookingForAJobDescription: profile.lookingForAJobDescription,
                contacts: {...profile.contacts}
            }}
            onSubmit={(values, {setSubmitting, resetForm, setErrors}) => {
                let payload = {...values}
                saveProfile(profile.userId, payload).then((response_data) => {
                    if (response_data.resultCode === 0) {
                        setSubmitting(false);
                        resetForm();
                        setEditMode(false);
                    } else {
                        console.log('handle error', response_data.messages)
                        setSubmitting(false);
                    }
                })
            }}
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
                    <Form className={s.profileDataForm}>
                        <TextField
                            fullWidth
                            id="fullName"
                            name="fullName"
                            label="FullName"
                            value={values.fullName}
                            onChange={handleChange}
                            error={touched.fullName && Boolean(errors.fullName)}
                            helperText={touched.fullName ? errors.fullName : ''}
                        />
                        <TextField
                            fullWidth
                            id="aboutMe"
                            name="aboutMe"
                            label="aboutMe"
                            value={values.aboutMe}
                            onChange={handleChange}
                            error={touched.aboutMe && Boolean(errors.aboutMe)}
                            helperText={touched.aboutMe ? errors.aboutMe : ''}
                        />
                        <Checkbox
                            size="small"
                            id="lookingForAJob"
                            name="lookingForAJob"
                            label="lookingForAJob"
                            checked={values.lookingForAJob}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            id="lookingForAJobDescription"
                            name="lookingForAJobDescription"
                            label="lookingForAJobDescription"
                            value={values.lookingForAJobDescription}
                            onChange={handleChange}
                            error={touched.lookingForAJobDescription && Boolean(errors.lookingForAJobDescription)}
                            helperText={touched.lookingForAJobDescription ? errors.lookingForAJobDescription : ''}
                        />

                        <div>
                            <b>Contacts:</b>

                            {Object.keys(profile.contacts).map((key) => {
                                return <TextField
                                    fullWidth
                                    id={"contacts." + key}
                                    name={"contacts." + key}
                                    key={"contacts." + key}
                                    label={key}
                                    value={values.contacts[key]}
                                    onChange={handleChange}
                                    error={touched["contacts." + key] && Boolean(errors["contacts." + key])}
                                    helperText={touched["contacts." + key] ? errors["contacts." + key] : ''}
                                />
                            })}
                        </div>
                        
                        <Button id="saveBtn" color="primary" variant="contained" fullWidth type="submit">
                            Save
                        </Button>
                    </Form>
                )
            }}

        </Formik>
    )
}

export default ProfileInfo