fetch(api_url, {
    method: 'POST',
    body: JSON.stringify({
        
            from:"en",
            to:"hi",
            text:"hello i am aniket how are you"
        
    }),
    headers: {
       'Content-type': 'application/json; charset=UTF-8',
    },
 })
    .then((res) => res.json())
    .then((post) => {
       // setPosts((posts) => [post, ...posts]);
       setPosts(post)
       
       
    })
    .catch((err) => {
       setErr(err.message)
       console.log(err.message);
       setLoading('')
    });