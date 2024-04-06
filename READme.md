4 april 2024
==============================================
installed flowbite-react
alt+shift+ down     =>copy and paste just below


creating header comp
using useLocation in order to know the path name of our url

------------
backend making

....................
signup ui is ready
adding proxy in vite.config.js for fetch==============>2:10:00 vdo
done wiyth the signup functionality
created footer{
    Footer.Title
    Footer.LinkGroup
    Footer.Link{ rel='noopener noreferror' ->so that browser dosn't block any popup }
    Footer.Divider
    
}

//user loggin and cookie returning
/============5 april===================
installed react-redux and toolkit in frontent for state management
installed redux-persist (for storing data permanently into localstorage)
and also we are going to combine reducers using combineReducers;


import storage from 'redux-persist/lib/storage';      {BHaisaaaaaaaaaaaaaaaBBBBBBBB}
now even if we refresh the page it will be stored in local storage and will be maintained in state as well

//=========1.37 AM (time to add Google OAuth)============>IMPORTANT
signed in to firebase
created new project
nicknameed it-  MERN-BLOG
said no to google analytics
npm i firebase in frontend
created firebase.js and copy pasted everything from google 
now hiding some info in .env

in the end export last line in firebase.js

click continue to console
do authentication
choose google=> do enable
rename project name wahi
do write email id


so,now our google is enabled!!!!!

cross-origin krke kuch error ayega ignore it

completing handleGoogleClick func in OAuth.js
{===========IMPORTANT=====================
     provider.setCustomParameters({prompt:'select_account'}); //this line will say prompt pop-up to show everytime(choose an account)
}
========================================
Done with the OAuth UI 
now working in its backend ---. creating anew route to handle data
router.post('/google',googleController);
