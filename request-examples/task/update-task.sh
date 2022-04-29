# Update a Task
curl -X PATCH localhost:3000/takss/update \
-H 'Content-Type: application/json' \
-d '{
      "categoryId": 1,
      "description": "check emails",
      "dueDate": "2022-04-21T11:04:28.000Z",
      "id": 1
}' | json_pp
