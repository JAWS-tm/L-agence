# L'agence - Web

This repository contains the source code for the **L'agence** web application and its backend.

## Requirements

It's recommended to use [Yarn](https://yarnpkg.com/) as a package manager.

You also need to have a database available.

## Installation

Run the following commands to install the dependencies:

```bash
yarn
```

_When installing dependencies, be sure to be in the correct package directory (**frontend or backend**) and not at the root of the project._

## Usage

Run the following command to start the development server (backend & frontend):

```bash
yarn dev
```

To run only the backend or the frontend, run the following commands:

```bash
yarn dev:backend
yarn dev:frontend
```

_You can also launch the backend and the frontend separately by going to the package directory and running the `yarn dev` command._

## Documentation

There's a README in each package directory that explains the particularities of each project.

- [frontend](packages/frontend/README.md)
- [backend](packages/backend/README.md)

## Deployment

The deployment is done using [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).

The `docker-compose.yml` is configured to work locally _(by building the images locally)_ and on a Github action _(by using the images from the Github Container Registry)_ to deploy the application on a server.

> The stack only exposes one port (`PROXY_PORT`). This proxy will redirect the requests to the frontend or the backend depending on the path.

### Requirements

To start the stack with Docker Compose, you need to have a `.env` file at the root of the project with the following variables:

```bash
# Database configuration (Local to the Docker Compose stack)
DB_NAME=<db_name>
DB_USERNAME=<db_username>
DB_PASSWORD=<db_password>
DB_ROOT_PASSWORD=<db_root_password>

MAILER_EMAIL=<mailer_email>
MAILER_PASSWORD=<mailer_password>

SITE_URL=<url_of_the_site> # Used to configure CORS xxx.xxx.xxx.xxx:3000, https://lagence.com, ...

PROXY_PORT=80 # The port where the proxy will listen (where the frontend/backend will be available)
```

### Local deployment

If you want to start the application locally, use the following command:

```bash
docker compose up
# or to run in detached mode
docker compose up -d
```

### Deployment on a server (Github Action)

The deployment on a server is done using a Github Action workflow. The workflow is triggered when a commit is pushed to the `master` branch.

> The workflow is configured to build the images and push them to the Github Container Registry. Then, it connects to the server using SSH and pulls the images to start the stack.

The server needs to have `Docker` and `Docker Compose` installed.

The server also needs to have the `.env` file at the root of the project with the same structure as the example above.

To use the Github Action workflow on your server, you should fork the repository and add the following secrets to your repository:

- `SSH_DEPLOY_PATH`: The path where the project is located on the server
- `SSH_IP`: The IP address of the server
- `SSH_PORT`: The port to connect to the server
- `SSH_KEY`: The private key to connect to the server
- `SSH_USER`: The user to connect to the server

## Related

There's the repository of the desktop application: https://github.com/maxsans/L-Agence-Desktop
