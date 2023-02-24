import s from './ProfileInfo.module.css'
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";


export default (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <ProfileStatus
                    status={props.status}
                    updateStatus={props.updateStatus}
                    canEdit={props.me? props.profile.userId === props.me.id: false}
                />
                {props.profile.fullName}
                 ava + description
            </div>
        </div>
    )
}