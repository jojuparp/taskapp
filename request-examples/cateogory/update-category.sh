# Update a category
curl -X PATCH localhost:3000/categories/update \
-H 'Content-Type: application/json' \
-d '{
  "id": 1,
  "name": "other"
}' | json_pp
