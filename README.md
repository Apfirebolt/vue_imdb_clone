# Vue IMDB App

An app written in Vue which shows IMDB data coming from Rapid API. It has movies and tv shows sections.

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Table of Contents
1. [Project Briefing](#project-briefing)
2. [Technologies Used](#technologies-used)
3. [Screenshots](#screenshots)
4. [Updates](#updates)
5. [Thank You](#thank-you)

## Project Briefing

This project uses an API from Rapid API which contains IMDB data for movies. These are the headers used in the interceptor file for calling APIs.

```Javascript
import axios from 'axios';

let baseURL = 'https://imdb236.p.rapidapi.com/api/';

// add x-rapidapi-host and x-rapidapi-key headers
const headers = {
    'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST,
    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY
};

const httpClient = axios.create({ baseURL, headers });

// print request headers
httpClient.interceptors.request.use(request => {
    return request;
});

export default httpClient;
```

Create an env file with the secrets

```
VITE_RAPIDAPI_HOST=host.p.rapidapi.com
VITE_RAPIDAPI_KEY=your_key_here
```

## Technologies Used
- Vue 3
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3

## Writing Test cases

Test cases are written using Vitest framework. Install the related dependencies for the testing framework and tweak vite config settings.

```Javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
  },
  server: {
    port: 8080
  }
})
```

## Screenshots

![Shows](./screenshots/1.png)
![Movies View](./screenshots/2.png)
![Login](./screenshots/3.png)
![Indian Movies](./screenshots/4.png)

## Updates
- **v1.0.0**: Initial release with basic functionality.
- **v1.1.0**: Added new features and improved performance.

## Thank You

Thank you for exploring the Vue IMDB App! Feel free to contribute or provide feedback to help improve the project. If you liked this project consider giving it a ⭐

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
