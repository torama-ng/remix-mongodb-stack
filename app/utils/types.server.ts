import type { WithId, Document } from "mongodb";
import type mongoose from 'mongoose'

export interface Movie extends WithId<Document> {
  plot: string,
  genres: string[],
  runtime: number,
  rated: string,
  cast: string[],
  title: string,
  fullplot: string,
  languages: string[],
  released: string,
  directors: string[],
  writers: string[],
  awards: {
    wins: number,
    nominations: number,
    text: string,
  },
  lastupdated: string,
  year: number,
  imdb: {
    rating: number,
    votes: number,
    id: number,
  },
  countries: string[],
  type: string,
  tomatoes: {
    viewer: {
      rating: number,
      numReviews: number,
      meter: number,
    },
    dvd: string,
    lastUpdated: string,
  }
}

export interface Expense extends WithId<Document> {
  
    products: [
      {
        name: { type: String },
        description: { type: String },
        category: { type: String },
        qty: { type: Number },
        unit: { type: String },
        price: { type: Number },
        amount: { type: Number },
      },
    ],
    notes: [
      {
        text: { type: String },
        author: { type: String },
        date: { type: Date },
        image: { type: String },
      },
    ],
    log: [{}],
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Contact" },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    updater: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    site: { type: String },
    company: { type: String },
    deliveryStatus: {
      type: String,
      enum: ["DELIVERED", "NOT DELIVERED"],
    },
    status: {
      type: String,
      enum: [
        "DRAFT",
        "VALIDATED",
        "REVIEWED",
        "OPEN",
        "APPROVED",
        "PART-PAY",
        "PAID",
        "DECLINED",
      ],
    },
    approvalComment: { type: String },
    title: { type: String },
    category: { type: String },
    expenseAccount: { type: String },

    payment: {},
    payHistory: [{}],
    statusHistory: [
      {
        oldStatus: { type: String },
        newStatus: { type: String },
        updater: { type: String },
        date: { type: Date },
      },
    ],
    date: { type: Date },
    type: { type: String },
    txn_amount: { type: Number },
    balance: { type: Number, default: 0 },
    remarks: { type: String },
  
}