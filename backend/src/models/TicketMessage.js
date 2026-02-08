import mongoose from "mongoose";

const ticketMessageSchema = new mongoose.Schema(
  {
    ticket_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: 2000,
    },
    attachments: [
      {
        filename: String,
        url: String,
        size: Number,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        ret.created_at = ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Index for faster queries
ticketMessageSchema.index({ ticket_id: 1, created_at: 1 });

const TicketMessage = mongoose.model("TicketMessage", ticketMessageSchema);

export default TicketMessage;
