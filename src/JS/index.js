import express from 'express';
const app = express();

app.use(express.static("src"))
// app.get('/', (req, res) => {
//     res.send('Hello, world');
// })

app.listen(4000, () =>{
    console.log('listening on port 4000');
})

// vga hd hdtv 4k
// VGA video only