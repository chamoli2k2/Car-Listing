import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },

    description: { 
        type: String, 
        required: true 
    },

    year: {
        type: Number,
        required: true,
    },

    model: {
        type: String,
        required: true,
    },

    imageUrls: [
        {
            type: String,
        },
    ],

    price: {
        type: Number,
        required: true,
    },

    type: {
        type: String,
    },

    tags: [
        {
            type: String,
        },
    ],
}, 

{ 
    timestamps: true 
}
);

const Car = mongoose.model('Car', carSchema);
export default Car;