import { createRequire } from 'module'
import moment from 'moment'
const require = createRequire(import.meta.url)
const jwt = require('atlassian-jwt')

export default function jwtToken(method, endpoint, sharedSecret) {
  const now = moment().utc()
  const req = jwt.fromMethodAndUrl(method, endpoint)
  const tokenData = { 
    "iss": "intercom-integration",
    "iat": now.unix(),
    "exp": now.add(3, 'minutes').unix(),
    "qsh": jwt.createQueryStringHash(req)
  }
  return jwt.encode(tokenData, sharedSecret)
}