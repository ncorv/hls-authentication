# hls-authentication

**Configuration**
An example configuration json has been provided as `hls-authentication.json.example`
It contains the following fields:
```
{
  "port": "6060",
  "proxy_url": "https://yoursite.com/",
  "hls_path": "./hls/",
  "key_path": "./hls/keys/",
  "auth_key": "12345",
  "ssl_key": "./privkey.pem",
  "ssl_cert": "./cert.pem",
  "ssl_ca": "./chain.pem",
  "ACAO": "https://yoursite.com"
}
```
- `port` : The port Node.js should listen on.

- `proxy_url`: The FQDN of your www-root, ex: https://mysite.com/

- `hls_path`: The local path of HLS segments, `/home/you/src/hls-server/hls/`

- `key_path`: Where the HLS key files are found, `/home/you/src/hls-server/hls/keys/`

- `auth_key`: A random string used to prevent web crawler or automated requests.

- `ssl_key`: Path to `privkey.pem` 

- `ssl_cert`: Path to `cert.pem`

- `ssl_ca`: Path to `chain.pem`

- `ACAO` : Where the Access-Control-Allow-Origin header should point to.
