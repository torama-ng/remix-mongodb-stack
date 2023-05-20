import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { mongodb, ObjectId } from "~/utils/db.server";

export async function loader({ params }: LoaderArgs) {
  const expenseId = params.expenseId;

  let db = await mongodb.db("treasury");
  let collection = await db.collection("expenses");
  let expense = await collection.findOne({_id: new ObjectId(expenseId)});

  return json(expense);
}

export default function Index() {
  const expense = useLoaderData();
  return (
    <div>
      <h1>Movie: {expense.title}</h1>
      <p>{expense.type}</p>
    </div>
  )
}