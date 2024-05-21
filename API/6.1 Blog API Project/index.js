import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//
class PostService {
  constructor(){
    // In-memory data store
    this.posts = [
      {
        id: 1,
        title: "The Rise of Decentralized Finance",
        content:
          "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
        author: "Alex Thompson",
        date: "2023-08-01T10:00:00Z",
      },
      {
        id: 2,
        title: "The Impact of Artificial Intelligence on Modern Businesses",
        content:
          "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
        author: "Mia Williams",
        date: "2023-08-05T14:30:00Z",
      },
      {
        id: 3,
        title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        content:
          "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
        author: "Samuel Green",
        date: "2023-08-10T09:15:00Z",
      },
    ];
    this.currentDate = new Date();
    this.newId = this.posts[this.posts.length - 1].id + 1
  }

  createPostObject(id, title, content, author, date){
    return {
      id: id,
      title: title,
      content: content,
      author: author,
      date: date
    }
  }

  getAllPosts(){
    return this.posts;
  };

  getPost(id){
    return this.posts.find(post => post.id === parseInt(id));
  };

  uploadPost(title, content, author){
    const newPost = this.createPostObject(this.newId, title, content, author, this.currentDate);
    this.posts.push(newPost);

    return true;
  };

  updatePost(id, title, content, author){
    const post = this.getPost(id);
    if(!post){
      return false;
    }

    const replacementPost = this.createPostObject(
      parseInt(id),
      title || post.title,
      content || post.content,
      author || post.author,
      this.currentDate
    );
    this.posts[this.posts.findIndex(p => p.id === parseInt(id))] = replacementPost;

    return true;
  };

  deletePost(id){
    const post = this.getPost(id);
    if(!post){
      return false;
    }

    const post_index = this.posts.findIndex(p => p.id === id);
    if(post_index > -1){
      this.posts.splice(post_index, 1);
      return true;
    }else{
      return false;
    }
  }
}

// Declare postService
const postService = new PostService();

//CHALLENGE 1: GET All posts
app.get('/posts', (req, res) => {
  res.status(200).json(postService.getAllPosts());
});

//CHALLENGE 2: GET a specific post by id
app.get('/posts/:id', (req, res) => {
  const post = postService.getPost(req.params.id);

  if(post){
    res.status(200).json(post);
  }else{
    res.status(404).json({
      message: "Post not found! Please reload the page or try again later."
    });
  }
});

//CHALLENGE 3: POST a new post
app.post('/posts', (req, res) => {
  let returnedStatus = postService.uploadPost(req.body.title, req.body.content, req.body.author);

  if(returnedStatus){
    res.json({
      message: "New post has been created."
    })
  }
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch('/posts/:id', (req, res) => {
  let returnedStatus = postService.updatePost(req.params.id, req.body.title, req.body.content, req.body.author);

  if(returnedStatus){
    res.json({
      message: "Post has been updated"
    });
  }else{
    res.status(404).json({
      message: "Post not found!"
    });
  }
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete('/posts/:id', (req, res) => {
  let returnedStatus = postService.deletePost(parseInt(req.params.id));

  if(returnedStatus){
    res.json({
      message: "Post has been deleted successfully."
    });
  }else{
    res.status(404).json({
      message: "Post not found!"
    });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
