# taco-start-script

Run a start command depending on the environment. Compatible with other [taco](https://github.com/maxogden/taco) deployment tools.

	npm install -g taco-start-script

# Usage

In the `package.json` specify a start command for each environment.

```json
{
	"name": "my-app",
	"scripts": {
		"start": "taco-start-script",
		"start-development": "node server.js",
		"start-staging": "taco-nginx node server.js",
		"start-production": "taco-nginx --https-only node server.js"
	}
}
```

Now when running `npm start` the script will look at `NODE_ENV` environment variable to determine how to start the application. If not specified it defaults to `development`.
