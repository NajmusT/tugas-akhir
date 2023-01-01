import React, { useState } from 'react'
import "../Styles/ImagesUploaderStyles.css"

const ImagesUploader = (props) => {
    const { handleChange, src, img, viewOnly } = props

    return (
        <label htmlFor="photo-upload">
            {viewOnly ? (img.preview ? <img src={img.preview} /> : <></>) : (
                <>
                    <input id="photo-upload" type="file" onChange={handleChange} />
                </>
            )}
        </label>
    )
}

export default ImagesUploader