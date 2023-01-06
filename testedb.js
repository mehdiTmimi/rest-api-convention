// connection avec la db
const mongoose = require('mongoose');
//
// chaine de connection mongodb+srv://mehditmimi:d24KWFsKwn0ypVO4@cluster0.opkalrs.mongodb.net/?retryWrites=true&w=majority
const schemaPost = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:String
})

const Post=mongoose.model('posts',schemaPost)

mongoose
.connect
('mongodb+srv://mehditmimi:d24KWFsKwn0ypVO4@cluster0.opkalrs.mongodb.net/?retryWrites=true&w=majority')
  .then(() => 
  {
  /*  const post1=new Post({
        content:'some content here'
    })
    post1.save().then(data=>console.log(data)).catch(err=>console.log(err.message));

*/
    Post.findOne({title:'title 1 '}).then(async (data)=> {
        console.log(data)
        data.content="content updated"
      const res=  await data.delete()
      console.log(res)
 
  }).catch(err=>console.log(err.message));

  })
