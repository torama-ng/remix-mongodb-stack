import { Link } from "@remix-run/react";

export default function Expense (props: any) {
  return (
    <div key={props._id}>
      <Link to={`/expenses/${props._id}`}>
        {props.title} ({props.year})
      </Link>
    </div>
  )
}