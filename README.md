
About Focusalarm Chrome Extension
====================================

Focusalarm is a chrome extension built for Focusmate.com users. It was built with React and Material UI, and uses Chrome Tabs and Storage APIs. You can install it at this [link](https://chrome.google.com/webstore/detail/focusalarm/ilcajdpmgfbeggnpffmohcopdgpcdndh) in the chrome web store.

## Current Features

* Set an alarm go off before the end of Focusmate sessions, with different sounds and options of ringing times to choose from. 

* Set an alarm to go off a few seconds before the beginning of Focusmate sessions.


Run the extension locally
=============================

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

I made a sandbox app to mock a focusmate session scenario in terms of the timer for the purpose of testing the extension. **It currently only works for testing the alarm before the end of the session**. 
To access it use this [link](https://codesandbox.io/s/focusalarm-tester-updated-264-yrnj3). 

 To test, once setting the alarm times and sound on the extension popup,
 open the app in the sandbox in a new window. Input the desired time according to the alarm/s you want to test. 

The alarm should ring when the timer on the app reaches the time you set the alarm for. If you want to test the extension more than once on the mock app, you will have to make a clone of it and then open it in another window.

You can also of course test it in a Focusmate session. Please keep in mind that testing an alarm on the mock app *during* a Focusmate session will result in that alarm not ringing later in the session.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

About Me (Focusalarm's developer)
---------------------------------
My name is Yael Luria. I’m a self-taught developer and have used Focusmate sessions to help me keep on task while going through a lot of online courses, tutorials, building projects and eventually finding a full time job as a Frontend Developer. Focusalarm is my way of giving back to Focusmate’s amazingly supportive community. I've built it as a portfolio project and learnt a lot in the process.

If you've noticed Focusalarm is not working properly (sometimes this happens when Focusmate makes changes to their interface) or if you have any questions or suggestions, please contact me at yaeluria@gmail.com.
