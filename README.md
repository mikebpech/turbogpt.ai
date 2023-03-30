# TurboGPT.ai - An improved UI for ChatGPT

TurboGPT is an open-source ChatGPT UI project that enables users to chat with AI-powered open GPT-3 technology. TurboGPT can be used as a standalone chatbot or integrated into a larger project.

We also have a live running version at https://turbogpt.ai

![TurboGPT Image](https://i.imgur.com/rqCepBb.jpg)

## Installation

To install and run TurboGPT, you need to use Yarn package manager. Clone this repository and install the necessary packages by running the following command:

```bash
yarn install
```


## Usage

To use TurboGPT, simply run the following command:

```bash
yarn start
```
This will start the project in your terminal. Simply enter your API key and then use it as normal.

## Docker

Build the Docker image with:


```bash
docker build . -t yourname/turbogpt
```

Run it as a container with:

```bash
docker run --name turbogpt -p 3000:3000 yourname/turbogpt
```

The container is accessible at port 3000.

## Contributing

We welcome and encourage contributions to TurboGPT. To contribute to the project, please follow these steps:

1. Fork the repository.
2. Add your changes and commit them.
3. Push to your fork.
4. Create a pull request.

## License

TurboGPT is licensed under the MIT License. Feel free to use and distribute it, but please do not remove the license header. Do not claim ownership over it or claim it as your own :) 

## Support

If you have any questions or issues with TurboGPT, please open an issue on the project GitHub page.

## Credits

TurboGPT was developed by Mike Pechousek (https://linkedin.com/in/mikepechousek). Special thanks to OpenAI for their simple API. 
