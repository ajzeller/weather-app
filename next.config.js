const dotenv = require('dotenv');
const withSass = require("@zeit/next-sass");

dotenv.config();

module.exports = withSass({
  env: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE: 'openid profile read:shows offline_access',
    API_AUDIENCE: process.env.API_AUDIENCE,
    API_BASE_URL: process.env.API_BASE_URL,
    REDIRECT_URI: process.env.REDIRECT_URI || 'http://localhost:3000/api/callback',
    POST_LOGOUT_REDIRECT_URI: process.env.POST_LOGOUT_REDIRECT_URI || 'http://localhost:3000/',
    SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,
    SESSION_COOKIE_LIFETIME: 7200, // 2 hours
    DATABASE: process.env.DATABASE,
    BASE_URL: process.env.BASE_URL
  }
})
