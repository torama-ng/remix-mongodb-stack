import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { mongodb } from "~/utils/db.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const expense = {
    title: formData.get("title"),
    year: formData.get("year")
  }
  const db = await mongodb.db("treasury");
  const collection = await db.collection("expenses");
  const result = await collection.insertOne(expense);
  return redirect(`/expenses/${result.insertedId}`);
}

export default function Index() {
  return (
    <div>
      <h2>Add a expense</h2>
      <Form method="POST" action="/expenses/add">
        <input type="text" name="title" placeholder="Title" />
        <input type="text" name="year" placeholder="Year" />
        <button type="submit">
          Search
        </button>
      </Form>
    </div>
  )
}