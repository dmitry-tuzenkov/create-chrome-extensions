rm key.pem manifest.key extension.id
# Create private key called key.pem
openssl genrsa 2048 | openssl pkcs8 -topk8 -nocrypt -out key.pem

# Generate string to be used as "key" in manifest.json (outputs to stdout)
openssl rsa -in key.pem -pubout -outform DER | openssl base64 -A > manifest.key

# Calculate extension ID (outputs to stdout)
openssl rsa -in key.pem -pubout -outform DER |  shasum -a 256 | head -c32 | tr 0-9a-f a-p > extension.id
echo "Extension ID (saved at extension.id):"
echo ""
cat extension.id
echo ""
echo ""