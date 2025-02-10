# banking-app
STEPS TO RUN DEVELOPMENT ENVIRONMENT

This is a mobile banking application built using React Native Expo. 
Prerequisites
Ensure you have the following installed on your machine:
Node.js (Recommended: LTS version) - Download here
Yarn or npm (Yarn recommended)
Android Studio (for Android emulator)
Xcode (for iOS development on macOS)
Expo CLI (if using Expo) 
Watchman (For better file watching on macOS/Linux) - brew install watchman


Clone the Repository
Using the link below clone the repository from GitHub

 Install Dependencies
Run the command below from your terminal to install dependencies
yarn install


Run the Application
If you clone from your system’s terminal, you can run code . This opens up an Integrated Development Environment (IDE), preferably VSCode. 
Now in your IDE terminal run  npx expo start, 

There are two ways to test the application,
With a physical device

For this process, download the Expo Go app on your phone, search Expo Go on Google Playstore or Apple App Store, and download it.
After downloading, connect your device to your laptop via an appropriate data-enabled USB cord.
Ensure the laptop and the mobile device are connected to the same data source. 
If all 3 steps above are followed and the command (npx expo start ) has been run on the IDE terminal, a QR code will be shown, scan the code to launch the app via the Expo Go application.


With an Android or an iPhone simulator

 As part of the prerequisites for running this application, Xcode(for MacOs only) and  Andriod Studio is required. 

For Andriod follow this link to download https://developer.android.com/studio

For MacOS, go to App Store and download Xcode. 

Within the app, you will find respective simulators to be used, I recommend watching this video to set it up properly
https://www.youtube.com/watch?v=AgjXJI7EQAA
After everything is set up and running for any device of your choice, and you have run the command (npx expo start) you get to see a drop-down of commands to run on any of your choice devices. Use the command to run the application on your virtual simulator.



THINGS TO NOTE IN THE APP

From the task document, no design was given so I intuitively designed with inspiration from a variety of existing bank apps.
After successfully running the application on any of your preferred means, to login you will need details of users I have uploaded on my Mock API as instructed. Here is the link to access the JSON file online
https://67a758b6203008941f6756f1.mockapi.io/api/v1/users, 
You need, the username and password to login as a user, for ease of login, below is a pair of username and password for a user from the database.

"username": "uche",
"password": "password"
After a successful login, to log out, the user clicks on the red-colored log-out icon by the top right side of the dashboard screen. This returns the user to the login screen for a possible login.
The Screens for the Profile and Settings can be accessed from the Drawer navigation.

