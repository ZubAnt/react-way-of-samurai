import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import avatar from '../../../assets/images/avatar.png'



export default (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const isOwner = props.me? props.profile.userId === props.me.id: false

    const onMainPhotoSelected = (e) => {
        props.savePhoto(e.target.files[0])
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || avatar}/>
                {isOwner? <input type="file" onChange={onMainPhotoSelected}/>: ''}
                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                    canEdit={isOwner}
                />
                {props.profile.fullName}
                 ava + description
            </div>
        </div>
    )
}