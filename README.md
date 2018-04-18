# Sendgrid Lambda

AWS Lambda function built using node to send emails via the Sendgrid API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [node.js](https://nodejs.org/en/download/) - since this is a node function, we need node.js

* [npm](https://docs.npmjs.com/getting-started/installing-node) - package manager for node.js

* [nvm](https://github.com/creationix/nvm) - version manager for node.js | this function, lambda-tester, and node-lambda need 6.10.0 to run

### Instalation

Clone the repository

```
git clone https://github.com/malyons/sendgrid-lambda.git
```

Install dependencies

```
npm install
```

Create .env files using node-lambda package

Full instructions for node-lambda can be found [here](https://www.npmjs.com/package/node-lambda)

```
node-lambda setup
```

After the .env files are created, you'll need to fill the .env file with the information requested so node-lambda knows where to deploy to.

Create a test .env file for Jest

```
touch .env-test /test
```

Once you have the .env-test filled out with a valid Sendgrid API key, run the tests to make sure everything is set up correctly

```
npm run test
```

After filling out .env and event.json node-lambda will allow you to run the function locally using what you set. From there just modify to suit your needs.

```
node-lambda run
```

## Running the tests

```
npm run test
```

There's currently only 1 test suite that checks for the environment variables to be set for a Sendgrid API key, to and from email, and to make sure error handling within the mail send methods work correctly.

### Linting

eslint and prettier are used in this project, extending the airbnb template with a couple minor exceptions added in their respective config files.

```
npm run lint
```

## Deployment

To deploy to AWS Lambda, you'll need a filled out deploy.env file for node-lambda to use. Node-lambda will package your lambda, and environment variables and deploy them directly to AWS Lambda for you. To do so run the following command:

```
node-lambda deploy
```

## Built With

* [Sendgrid Node API Library](https://github.com/sendgrid/sendgrid-nodejs) - Used to interact with the Sendgrid API
* [Node Lambda](https://www.npmjs.com/package/node-lambda) - Used to simulate AWS Lambda for local development, and deployment
* [Lamda Tester](https://github.com/vandium-io/lambda-tester) - Test library for simulating AWS Lambda for Jest
* [Jest](https://facebook.github.io/jest/) - Facebooks test framework for unit testing

## Contributing

1. Fork the repo
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Added some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for more details on the code of conduct.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/malyons/sendgrid-lambda/tags).

## Authors

* **Marcus Lyons** - *Initial work* - [@malyons](https://github.com/malyons)

The list of [contributors](https://github.com/malyons/sendgrid-lambda/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
