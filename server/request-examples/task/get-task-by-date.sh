# Get all Tasks that are due on a specific date (excluding time). Date must be a valid Javascript Date constructor (string)
curl -X GET localhost:3000/tasks/duedate \
-H 'Content-Type: application/json' \
-d '{
  "date": "2022-04-21T11:04:28.000Z"
}' | json_pp
