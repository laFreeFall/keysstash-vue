# KeysStash
## SPA built with Vue.js that provides the opportunity of storing new and managing existing game keys.
If often happens, when you get a key for a game you already have or you just want to put a key on a hold for a while. Firstly you may choose a simple notepad for that, but it becomes too messed up and complicated over time. Here is our turn! This web app allows you easily manage your virtual stash of games and keys. You have access to all Steam games from it store to quickly add them to your stash and begin earning keys.

![KeysStash](https://i.imgur.com/KRW2TFE.png)

## What project uses

**Frontend**
- [Vue.js](https://github.com/vuejs/vue)
- [axios](https://github.com/axios/axios)
- [BootstrapVue](https://github.com/bootstrap-vue/bootstrap-vue) *(for fast and beauty design prototyping)*
- [normalizr](https://github.com/paularmstrong/normalizr) *(for normalizing nested data from backend)*
- [vuelidate](https://github.com/monterail/vuelidate) *(for forms validation)*
- [vue-select](https://github.com/sagalbot/vue-select) *(for comfortable selecting Steam games by typing its names)*
- [debounce](https://github.com/component/debounce) *(for not sending ajax search requests after each typed letter in vue-select)*
- [vue-awesome](https://github.com/Justineo/vue-awesome) *(for easy font-awesome icons integrating)*
- [vue-content-loader](https://github.com/egoist/vue-content-loader) *(for prototyping content loaders (placeholders))*
- [vue-notification](https://github.com/euvl/vue-notification) *(for displaying toasts)*
- [vue-clipboard2](https://github.com/Inndy/vue-clipboard2) *(for managing copying keys to buffer)*

**Backend**
- [Laravel 5.6](https://github.com/laravel/laravel)
- [Laravel Passport](https://github.com/laravel/passport)


## Installation
Download the project
`git clone lafreefall/keysstash-vue projectname`

`cd projectname`

- Frontend

1. Go to the project folder and install all the dependencies
`npm install`

2. Do all the necessary backend preparations decribed [here](https://github.com/laFreeFall/keysstash-laravel).

3. After installing passport set its `access_token` in `projectname/store/modules/users.js` as a value of `clientSecret`

4. Run a watcher to display your code changes on the fly
`npm run serve`

If you need to bundle a final file
`npm run build`

## Brief project description with its main features
 
 > If you want don't want to encounter with longreads below, follow the [link](https://imgur.com/a/0HSUV28) and watch an [album of screenshots on imgur](https://imgur.com/a/0HSUV28) without huge amount of text.
 ### Stash front page
 ![Stash front page](https://i.imgur.com/V5QP86k.gif)
 Here all of user's keys are displayed with next features:
 - Filtering by keys status (show only used keys, only brand new or both)
 - Filtering by game platform (show only games listed on Steam, only Non-Steam games or both)
 - Sorting by amount of keys, title of the game and date when user add the game (all the options available in both ascending and descending orders)
 - Live search by game title (is not case-sensitive)
 - If the game is listed on Steam, on the left of its title Steam icon will be displayed that leads to the Steam Store page of the game.
 - If the game is listed on Steam, the only format of keys it accepts is three groups consisting of five capital letters or digits like `ABC12-DEF34-567GH`
 - If the game has no keys stored at the moment, its card color scheme will be switched from blue to gray

  ### Adding new game
 ![Adding new game](https://i.imgur.com/PHwkMVz.gif)
 User may easily add new game to its stash if he wants with some extra features:
 - If the game is not listed on Steam, you may switch to right tab and fill only required Title attribute to add it.
 - If the game is listed on Steam, two options. If the game is still presented on the Steam Store, you may just start typing in the top input, and it'll suggest you games from the Steam database. If the game was previously deleted from the Steam Store, you may check corresponding box, because search input won't be useful in this case and type game title on your own.
 - If the game is listed on Steam, after picking it from select dropdown, all the other fields will be filled automatically (like steam appid, link and image).
 - Right after filling the Title input, preview of the game card will be shown below. You may add url to an image to replace the default one and it will be instantly displayed on the preview card.
 - If you started searching for a game in your stash but failed to find it, the tip will appera that will contain a link right to the adding new game page and the game title will be already filled with your previous search input.
 
   ### Managing game's keys
 ![Managing game's keys](https://i.imgur.com/eRO80uI.gif)
 You may use existing keys or add new ones right from the front page via card interface. Available features are listed below 
 - If the game has more than N keys (3 by default), all the others will be hidden and available by clicking on the corresponding button
 - Copying key to the buffer by clicking on the copy icon on the left of the key line
 - Toggling key used status (setting it as used or as brand new) by clicking on the toggle icon on the right of the key line
 
   ### Authorization
 ![Authorization](https://i.imgur.com/Rqruoo7.gif)
 Brief description of how authorization works in the app.
 - User may log in its profile by filling the login form with email and password
 - Backend checks incoming data for the matching with the existing users records.
 - If it doesn't fail it generate an access and refresh tokens and send it back to the user.
 - User stores tokens in local storage to keep them after closing a browser tab and set authorization header with bearer access_token to all requests to allow server recognize an authenticated user
 - If user logs out, local storage clears and authorization headers resets.

> If you want to see more - watch the [full screenshots album on imgur](https://imgur.com/a/0HSUV28).

