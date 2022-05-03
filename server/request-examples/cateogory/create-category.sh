# Create a new Category
curl -X POST localhost:3000/categories/create \
-H 'Content-Type: application/json' \
-d '{
  "name": "general"
}' | json_pp
