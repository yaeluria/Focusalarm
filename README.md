
## Run the extension locally
## Project setup

In the project directory, install dependencies using:

### `npm install`

You can compile the project using the following code in your command line:

### `npm run build`

In order to run the extension locally, you will have to install it in Chrome. You can do the following to install it:
In Chrome, open the extension list by opening a new tab and running the following URL:

### `chrome://extensions/`

Press the Load unpacked extension… button.
Browse to the build folder and press the OK button.
If everything goes right, you will have your extension installed in Chrome.

I made a sandbox app to mock a focusmate session scenario in terms of the timer for the purpose of testing the extension.
To access it use this [link](https://codesandbox.io/s/focusalarm-tester-updated-264-yrnj3).

 To test, once setting the alarm times and sound on the extension popup,
 open the app in the sandobox in a new window. Input the desired time according to the alarm/s you want to test.

The alarm should ring when the timer on the app reaches the time you set the alarm for. If you want to test the extension more than once on the mock app, you will have to make a clone of it and then open it in another window.

You can also of course test it in a Focusmate session. Please keep in mind that testing an alarm on the mock app *during* a Focusmate session will result in that alarm not ringing later in the session.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

