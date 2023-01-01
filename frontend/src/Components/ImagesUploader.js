import React, { useState, useRef, useEffect } from "react";
import ImageIcon from "../asset/icons/Image";
import "../Styles/ImagesUploaderStyles.scss";

const ImagesUploader = (props) => {
    const { useInput } = props
    const onSelectFile = (event) => {
        const fileUrl = URL.createObjectURL(event.target.files[0]);
        profilePicture.handleChange(fileUrl);
    }

    const handleClickProfilePicture = () => {
        profilePictureInput.current.click();
    }

    const profilePicture = useInput(null);
    const profilePictureInput = useRef(null);

    useEffect(() => {
        console.log(profilePicture.value)
    }, [profilePicture])

    return (
        <div>
            <input
                hidden
                ref={profilePictureInput}
                type="file"
                onChange={onSelectFile}
                accept="image/png,image/gif,image/jpeg"
            />
            <div>
                {profilePicture.value === null ? (
                    <div
                        className="profile-picture-default"
                        src={profilePicture.value}
                        alt="profile picture"
                        onClick={handleClickProfilePicture}
                    >
                        <ImageIcon fill={'#EFEFEF'} style={{ position: 'relative', width: '7vw', height: '7vw', padding: "0px 32px", top: '32%', left: '22%' }} />
                    </div>
                ) : (
                    <div
                        className="profile-picture"
                        style={{ backgroundImage: `url(${profilePicture.value})` }}
                        onClick={handleClickProfilePicture}
                    />
                )}
            </div>
        </div>
    );
}

export default ImagesUploader