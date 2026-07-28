'use client';

import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import styles from './ImageUploader.module.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const ImageUploader = ({
    value = "",
    onUpload,
    accept = {
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png']
    },
    placeholder = "Upload Image",
    maxFiles = 1,
}) => {

    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const uploadFile = async (file) => {
        const token = localStorage.getItem("access_token");
        const formData = new FormData();
        formData.append("file", file);
        /* formData.append("file", file); */
        try {
            setUploading(true);
            const res = await fetch(`${BASE_URL}/storage/upload`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await res.json();
            console.log("uploader res", data)
            if (!res.ok) {
                throw new Error(data?.message || "Upload failed");
            }
            toast.success("Image uploaded");
            return data?.data?.url;
            /* return data.data.url; */

        } catch (err) {
            toast.error(err.message);
            console.log("uploader res", err)
            return null;
        } finally {
            setUploading(false);
        }
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        console.log('file log:', file)
        if (!file) return;
        setPreview(URL?.createObjectURL(file));
        const url = await uploadFile(file);
        if (!url) return;
        onUpload(url);

    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        multiple: false,
        maxFiles

    });

    const removeImage = (e) => {
        e.stopPropagation();
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
        onUpload("");
    };

    return (
        <div {...getRootProps()} className={styles.container} style={{background: isDragActive ? "#f5faff" : "",}} >
            <input {...getInputProps()} />
            {
                uploading ?
                    (
                        <div>
                            Uploading...
                        </div>
                    )
                    :
                    preview ?
                        (
                            <div className={styles.previewContainer}>
                                <img src={preview} alt="preview" className={styles.preview} />
                                <button type="button" onClick={removeImage} className={styles.removeBtn}> × </button>
                            </div>
                        )
                        :
                        value ?
                            (
                                <div className={styles.previewContainer}>
                                    <img src={value} alt="preview" className={styles.preview} />
                                    <button type="button" onClick={removeImage} className={styles.removeBtn} > × </button>
                                </div>
                            )
                            :
                            (
                                <div className={styles.placeholder}>
                                    <h2>+</h2>
                                    <p>{placeholder}</p>
                                </div>
                            )

            }

        </div>
    );
};

export default ImageUploader;