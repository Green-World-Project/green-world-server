import mongoose from "mongoose";

const picturesSchema = new mongoose.Schema({
    pictures: [
        {
            fileName: { type: String, required: true },
            info: {
                name: { String, required: true },
                condition: { String, required: true }
            }
        }
    ]
})

const historySchema = new mongoose.Schema({
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    pictures: picturesSchema
});

historySchema.pre("save", function (next) {
    if (this.isNew) { // Only generate and prepend for new documents
        this.pictures?.pictures.forEach((picture) => {
            picture.fileName = `${new mongoose.Types.ObjectId()}_${picture.fileName}`;
        });
    }
    next();
});

export default mongoose.model(`History`, historySchema, `history`)
