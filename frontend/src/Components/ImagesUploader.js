import React, { useRef } from "react";
import ImageIcon from "../asset/icons/Image";
import "../Styles/ImagesUploaderStyles.scss";

const ImagesUploader = (props) => {
    const { useInput } = props

    const onSelectFile = (event) => {
        const image = event.target.files[0]

        const fileUrl = URL.createObjectURL(image);

        profilePicture.handleChange(fileUrl, image);
    }

    const handleClickProfilePicture = () => {
        profilePictureInput.current.click();
    }

    const profilePicture = useInput(null);
    const profilePictureInput = useRef(null);

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
                {profilePicture.urlValue === null ? (
                    <div
                        className="profile-picture-default"
                        src={profilePicture.urlValue}
                        alt="profile picture"
                        onClick={handleClickProfilePicture}
                    >
                        <ImageIcon fill={'#EFEFEF'} style={{ position: 'relative', width: '128px', height: '128px', padding: "0px 32px", top: '32%', left: '22%' }} />
                    </div>
                ) : (
                    <div
                        className="profile-picture"
                        onClick={handleClickProfilePicture}
                        style={{ justifyContent: 'center', alignContent: 'center' }}
                    >
                        <img src={profilePicture.urlValue} alt={'fotoProfil'} width="100%" height={"100%"} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImagesUploader