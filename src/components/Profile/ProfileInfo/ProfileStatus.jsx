import React, {useEffect, useState} from 'react'

const ProfileStatus = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        if (!props.canEdit) {
            return
        }
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{status || 'Не установлен'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}
                        onChange={onChangeStatus}
                    />
                </div>
            }
        </div>
    )
}

export default ProfileStatus
