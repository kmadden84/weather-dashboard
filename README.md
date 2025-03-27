# Weather Dashboard

A modern, responsive weather dashboard built with React and Material-UI. This application provides current weather information and a 5-day forecast for any city around the world.

## Features

- Real-time weather data using OpenWeatherMap API
- Current weather conditions with key metrics
- 5-day weather forecast
- Light and dark theme options
- Responsive design for all device sizes
- Beautiful, modern UI with smooth animations
- Interactive weather animations based on current conditions

## Environment Setup

This application requires an API key from OpenWeatherMap to function properly. Follow these steps to set it up:

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Copy the `.env.example` file to a new file named `.env`
3. Replace `your_openweathermap_api_key_here` with your actual API key

```
REACT_APP_WEATHER_API_KEY=your_actual_api_key_here
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run deploy`

Deploys the app to GitHub Pages. This command first runs the build script and then publishes the build folder to the gh-pages branch of your repository.

## Deployment to GitHub Pages

This project is set up for easy deployment to GitHub Pages. Follow these steps:

1. Open the `package.json` file and update the `homepage` field with your GitHub username:
   ```
   "homepage": "https://YOUR_GITHUB_USERNAME.github.io/weather_dashboard"
   ```

2. Make sure you have committed all your changes to your repository.

3. Run the deployment command:
   ```
   npm run deploy
   ```

4. GitHub Pages will serve your site from the gh-pages branch. Visit `https://YOUR_GITHUB_USERNAME.github.io/weather_dashboard` to see your deployed app.

5. For custom domains or other advanced GitHub Pages settings, see the [GitHub Pages documentation](https://docs.github.com/en/pages).

**Note:** Make sure your repo has proper permissions set up for GitHub Actions to deploy to Pages.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Technologies Used

- React
- Material-UI
- Axios
- OpenWeatherMap API
- React-Toastify for notifications
- Recharts for data visualization
- gh-pages for deployment

## License

MIT
