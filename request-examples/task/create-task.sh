# Create a new Task. The dueDate attribute accepts a valid Javascript date constructor (string).
curl -X POST localhost:3000/tasks/create \
-H 'Content-Type: application/json' \
-d '{
  "description": "do shopping",
  "dueDate": "2022-04-21T11:04:28.000Z",
  "categoryId": 1
}' | json_pp
