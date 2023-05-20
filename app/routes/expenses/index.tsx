import { useLoaderData, Form } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { mongodb } from "~/utils/db.server";
import type { Expense } from "~/utils/types.server";
import ExpenseComponent from "~/components/expense";

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);

  let db = await mongodb.db("treasury");
  let collection = await db.collection("expenses");
  let expenses = await collection.find({}).limit(10).toArray();

  let searchedExpenses: Expense[] = [];
  let searchTerm = url.searchParams.get("search");
  if (searchTerm) {
    let searchRegex = new RegExp(searchTerm, "i");
    searchedExpenses = (await collection.find({title: {$regex: searchRegex}}).limit(10).toArray()) as Expense[];
  }

  return json({expenses, searchedExpenses});
}

export default function Expenses() {
  let {expenses, searchedExpenses} = useLoaderData();
  return (
    <div>
      <h1>Expenses</h1>
      <h2>Fetch ten expenses</h2>
      <p className="mb-2">Here are some expenses from `treasury.expenses`</p>
      {expenses.map((expense: Expense) => {
        return (
          <ExpenseComponent key={expense._id} {...expense} />
        )
      })}

      <hr />
      <h2>Search for a expense</h2>
      <Form>
        <input type="text" name="search" placeholder="Partial title" />
        <button type="submit">
          Search
        </button>
      </Form>
      {!!searchedExpenses.length && searchedExpenses.map((expense: Expense) => {
          return (
            <ExpenseComponent key={expense._id} {...expense} />
          )
        })
      }

    </div>
  )
}