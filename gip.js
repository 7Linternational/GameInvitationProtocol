var gipAPI = gipAPI || {};

gipAPI = {
    signInUser: function(loginMail, password, fn) {
        window.console.log("trying to login");
        // adding the auth change event listener
        var auth = firebase.auth().onAuthStateChanged(function(user) {
            gipAPI.onAuthStateChanged(user, fn);
        });
        //////////////////////////////////////////////////////////////
        // checking for current user if present
        var user = firebase.auth().currentUser;
        if (user !== null) {
            // sign-out current user //
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                window.console.log("user signed out", firebase.auth().currentUser);
            }, function(error) {
                // An error happened.
                window.console.log("An error occured: ", error);
            });
        }

        // sign in into firebase //
        firebase.auth().signInWithEmailAndPassword(loginMail, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.console.log(errorCode, errorMessage);
            // ...
        });
    },
    signOutUser: function() {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
        }, function(error) {
            console.error('Sign Out Error', error);
        });
    },
    onAuthStateChanged: function(user, fn) {

        if (user) {
            console.log(user);
            fn();
            //if (firebase.auth().currentUser.emailVerified === false) {
            //GAME.Menu.prototype.unverifiedAccount(GAME.Menu.prototype._this);
            //}
        } else {
            // No user is signed in.
        }


    }
};