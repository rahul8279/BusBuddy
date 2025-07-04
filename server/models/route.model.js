import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true,
    trim: true
  },
  stops: [{
    stopId: {
      type: String,
      required: true
    },
    stopName: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    },
    sequence: {
      type: Number,
      
    },
    scheduledTime: {
      type: String,
      required: true
    }
  }],
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const Route = mongoose.model('Route', RouteSchema);