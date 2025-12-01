#!/bin/bash

# Test DELETE endpoint
echo "Testing DELETE endpoint..."
DELETED_USER_ID="test-user-123"
curl -X DELETE "http://localhost:3000/api/admin/users?id=${DELETED_USER_ID}" \
  -H "Content-Type: application/json" \
  -w "\nStatus: %{http_code}\n"

echo "\n---\n"

# Test GRANT endpoint  
echo "Testing GRANT endpoint..."
curl -X POST "http://localhost:3000/api/admin/grant" \
  -H "Content-Type: application/json" \
  -d '{"userId":"test-user-123","trainingId":"test-training-123","action":"grant"}' \
  -w "\nStatus: %{http_code}\n"

echo "\nDone."
