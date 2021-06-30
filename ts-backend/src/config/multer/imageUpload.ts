import multer, { StorageEngine, FileFilterCallback } from 'multer';
//import multerS3 from 'multer-s3';
//import aws from 'aws-sdk';
import path from 'path';
import crypto from 'crypto';

interface IStorageTypes {
    [key: string]: StorageEngine;
}

const storageTypes: IStorageTypes = {

    local: multer.diskStorage({

        destination: (req, file, callback) => {

            callback(null, path.resolve(__dirname, '../../../uploads'));
        },

        filename: (req, file, callback) => {

            crypto.randomBytes(16, (err, hash) => {

                if(err) callback(err, file.originalname);

                file.fieldname = `${hash.toString('hex')}-${file.originalname}`;

                callback(null, file.fieldname);                     
            });
        }
    }),

    /*s3: multerS3({
        s3: new aws.S3({ 
            accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
            region: process.env.AWS_DEFAULT_REGION
        }),
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, callback) => {
            crypto.randomBytes(16, (err, hash) => {
                if(err) callback(err);
                const filename = `${hash.toString('hex')}-${file.originalname}`;
                callback(null, filename);                     
            });
        }
    })*/
};

export default {

    //dest: path.resolve(__dirname, '../../uploads'),

    storage: storageTypes[process.env.IMG_STORAGE_LOCATION as string],

    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    },

    fileFilter: (req: Express.Request, file: Express.Multer.File, callback: FileFilterCallback) => {

        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if(allowedMimes.includes(file.mimetype)){

            callback(null, true);

        } else {

            callback(new Error('invalid file type'));
        }
    }
}
