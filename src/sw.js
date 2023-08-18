//registering
self.addEventListener('install', evt => {
  console.log("installed: ", evt);
});

//activate
self.addEventListener('activate', evt => {
  console.log("activated: ", evt);
})

