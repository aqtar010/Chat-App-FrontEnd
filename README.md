# Chat-App-FrontEnd

# Fire Chat (Front End)


This is a Personal Project of a Live chat application.
This is the front-end and built using ReactJS v18.0^. 


## Authors

- [@aqtar010](https://github.com/aqtar010)


## Run Locally

Clone this project

```bash
  git clone https://github.com/aqtar010/Chat-App-FrontEnd.git
```

Go to the project directory

```bash
  cd Chat-App-FrontEnd
```

Install dependencies

```bash
  npm install
```

Start the server locally

```bash
  npm run dev
```
## Usage
To use the app please setup the [backend](https://github.com/aqtar010/Chat-App-BackEnd) first

After the backend is set up and running head the sign in page.
since initially there are no registerd users, enter dummy details into the sign up page to create test users, after the users are created , launch multiple instances of local server (up to 5 simultanous users set, supported by cors policy).

Enter the sign in details in multiple tabs, with the signed up credentials, to enter the chat room.

When other users are also connected (locally) teh avalable user list shows, click on a user from the list shows the chat window, 
one can type input text , select the text amd select rich text options, and hei send to send the message.

Check the selected users chat to view the recieved message.

For live weblink preview, paste the hyperlink, select the hyperlink and press the inset hyperlink option in the toolbar and send. the live preview will show up after it fetches the meta data from the hyperlink.

To send files select the  +  butoon and choose the file and send file button.

to use mention, you can use @ key or press '@' keyword directly in the input which shows up the available user names.
## Tech Stack

**Client:** React, Redux, vite

**Server:** Node, Express, NPM
