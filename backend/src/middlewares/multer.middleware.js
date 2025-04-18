import multer from "multer"

const storage = multer.diskStorage({
    destination: (_,file,cb)=>{
        cb(null, "./public/temp")
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage})

export {upload}