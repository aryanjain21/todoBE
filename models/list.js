const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId
    },
    date: {
        type: Date
    },
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    CreatedAt: {
        type: Date
    },
    UpdatedAt: {
        type: Date
    }
}, { collection: 'list' })

listSchema.pre('save', function (next) {
    let list = this;
    list.CreatedAt = list.UpdatedAt = new Date();
    next()
})

const List = mongoose.model(listSchema.options.collection, listSchema);

module.exports = List;