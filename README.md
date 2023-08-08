# [Quiz App](https://text-quiz-28f12.web.app)

### https://text-quiz-28f12.web.app

## Features

Users are given a series of questions with english sentences. **In each question, they have to determine whether the emphasized text is gramatically correct or not.** Once the game ends, the results of their answers will be shown. 

### Home Screen

1. The app has two activities to choose from. Activity 1 consists of 1 round and 5 questions and Activity 2 consits of 2 rounds and 4 questions. 

2. Users are given a time limit setting of "Normal" or fifteen (15) seconds for each question. They can also set a custom limit of "Slow" or thirty (30) seconds or "Speed" which gives them only five (5) seconds.

3. To begin a game, users have to click the button corresponding to their chosen activity. 

### Each Question 

1. Each question will display a given sentence with a highlighted phrase that users have to examine. 

2. Once reading the phrase, users have to select on either the "Correct" or "Incorrect" button within their selected time frame. After this, they'll be given the question. 

3. The time left will appear at the top. If it reaches 0, the game will move on to the next question. 

### The Score

1. When all questions have been answered, users will be able to see a rundown of what they got correct and incorrect.  

2. If they wish to start a new round, they can click on the Home button.

3. Users also have the ability to Retry their mistakes, which will only prompt them with the questions they answered incorrectly.

### Others

1. The app is **mobile responsive** and may be used on most devices.

2. The app has design and audio features to accentuate the game environment. These may be found in `/assets`. 

## Important Notes 

### Technical Functionality 

* App data is centralized within the `/context` folder, particularly `Context.tsx`. Values such as the game state and the payload data are stored here. 

* Each of the screens/components interact with these states. For example, the Home page updates the game state ("to start a new game"), the Question page updates the question state ("to get the next question"), the Score marks a game as complete, and so on...

* As reflected in the comments in `App.tsx`, the app doesn't use a routing system such as react-router-dom due to the intrinsic nature of the game. The app is instead dependent on the `game` state on which of the three screens to display. This is to avoid having to run a redundant state check on every screen. 

### Proxy API

* The actual API is found at [https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json](https://s3.eu-west-2.amazonaws.com/interview.mock.data/payload.json). However, the S3 Bucket does not have a CORS configuration set to allow external origins such as that of this website.

* Rather than storing the returned JSON file directly within the app, a Proxy API was created within the same region (with CORS set) to access the data. **This was done so that the payload data can be processed and treated dynamically.** 

* In addition, the Proxy API was configured alongside the hosted website in Firebase via Cloud Functions. Locally, the `proxy` key is set in `package.json` so that the same url and path may be used. 

## Structure

Along with index and default files, the app is divided into three main folders.

### App

```
index.css
index.tsx
react-app-env.d.ts
App.tsx
assets/
components/
    Home.tsx
    Components.tsx
    Score.tsx
context/
    Context.tsx
    requests.tsx
    types.tsx
```

### Proxy API

```
src/
    index.tsx
```

## Technologies

* Built on `React with Typescript` and deployed on `Firebase Hosting`
* The App also uses `TailwindCSS` as the design framework.
* The Proxy API uses `Express & Typescript`
* The API is deployed via `Cloud Functions`

*The API is also configured and accessible in the app's hosted link.*

## Local Testing

Execute the following commands below. *There's no need to adjust the fetch URL since the proxy param is set on the dev server in package.json.*

### Start the App

1. Clone the repository 
2. Run `npm install`
3. Run `npm start`

### Start the Proxy API

1. Create a new terminal instance
2. Type `cd functions`
2. Run `npm run serve`