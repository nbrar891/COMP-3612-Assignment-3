// Nimrat Brar
// COMP3612
const path = require("path");
const  fs = require("fs");
const express = require("express");
const app = express();
app.listen(process.env.PORT || 4000, ()=>console.log("server on " + process.env.port))


const jsonPath1 = path.join(__dirname, "data","artists.json");
const jsonPath2 = path.join(__dirname,"data","galleries.json");
const jsonPath3  = path.join(__dirname,"data","paintings-nested.json");

let artists = null
let galleries = null
let paintings = null
 

fs.readFile(jsonPath1,(err,data, response)=>{

    if(err)
    {
    
        response.json({message : "Doesn't work"})
        console.log("File was not able to be read")
        alert("This Dataset is unavailable")
    }
    else{
        artists = JSON.parse(data)
    }

})
fs.readFile(jsonPath2,(err,data,response)=>{

    if(err)
    {
        response.json({message : "Doesn't work"})
        console.log("File was not able to be read")
        alert("This Dataset is unavailable")
    }
    else{
        galleries = JSON.parse(data)
    }

})
fs.readFile(jsonPath3,(err,data,response)=>{

    if(err)
    {
        response.json({message : "Doesn't work"})
        console.log("File was not able to be read")
        alert("This Dataset is unavailable")
    }
    else{
        paintings = JSON.parse(data)
    }

})

// This returns all JSON for all paintings
app.get("/api/paintings", (req,resp) =>
{
    const results = paintings;
    resp.json(results)

})

 // this returns all JSON for all galleries
app.get("/api/galleries", (req,resp) =>
{
    const results = galleries
    resp.json(results)
})

// this returns all JSON for all artists
app.get("/api/artists",(req,resp)=>
{
    const results = artists
    resp.json(results)
})

// this returns JSON containing the painting with the provided id
app.get("/api/painting/:id", (req,resp) =>
{
    const results = paintings.filter(p=> p.paintingID == req.params.id)

    if(results.length > 0) //checks if the painting ID is found if not it returns a message
    {
        resp.json(results)
    }
    else
    {

        resp.json({message: "No painting was found using this ID"})

    }
})

// this returns JSON containing the gallery with the provided ID
app.get("/api/painting/gallery/:id", (req,resp)=>
{
    const results = paintings.filter(p => p.gallery.galleryID == req.params.id)
    if(results.length > 0) //checks if the gallery ID is found if not it returns a message
    {
        resp.json(results)
    }
    else
    {
        resp.json({message: "No paintings were found using this gallery ID"})
    }

})

// this returns the JSON containing the paintings of the artist whose ID is the provided ID
app.get("/api/painting/artist/:id", (req,resp)=>
{
    const results = paintings.filter(p => p.artist.artistID == req.params.id)
    if(results.length > 0) //checks if the artist ID is found if not it returns a message
    {
        resp.json(results)
    }
    else
    {
        resp.json({message: "No paintings were found with this artist ID"})
    }

})

// This returns the JSON containing the paintings which were made between the provided min and max years
app.get("/api/painting/year/:min/:max", (req,resp) => 
{
    const results = paintings.filter(p => p.yearOfWork >= req.params.min && p.yearOfWork <= req.params.max)
    if(results.length > 0) //checks if the year is between the min and max is found, if not it returns a message
    {
        resp.json(results)
    }
    else
    {
        resp.json({message: "No paintings were found with this min and max"})
    }

})

// this returns the JSON containing the paintings with the provided text as a part of their title
app.get("/api/painting/title/:text", (req,resp) =>
{
    const results = paintings.filter(p => p.title.toUpperCase().includes(req.params.text)||p.title.toLowerCase().includes(req.params.text) || p.title.includes(req.params.text))
    if(results.length > 0) //checks if the title is found, if not it returns a message
    {
        resp.json(results)
    }
    else
    {
        resp.json({message: "No paintings were found with this as a part or as the title name"})
    }

})

// This returns the JSON containing the paintings that have a color matched with the provided value
app.get("/api/painting/color/:name", (req,resp) =>
{
    const results = paintings.filter(p => p.details.annotation.dominantColors.some(p => p.name.toUpperCase() == req.params.name ||p.name.toLowerCase() == req.params.name ||p.name == req.params.name))
    if(results.length > 0) //checks if the color name is found, if not it returns a message
    {
        resp.json(results)
    }
    else
    {
        resp.json({message: "No paintings were found with this color"})
    }

})

// This returns the JSON containing the artists from the country provided
app.get("/api/artists/:country", (req,resp) =>
{
    const results = artists.filter(p => p.Nationality.toLowerCase() == req.params.country ||p.Nationality.toUpperCase() == req.params.country ||p.Nationality == req.params.country  )
    if(results.length > 0) //checks if the artist from this country is found, if not it returns a message
    {
        resp.json(results)
    }
    else
    {
        resp.json({message: "Artists from this country were not found"})
    }
})
// this returns the JSON containing the galleries from the country provided
app.get("/api/galleries/:country", (req,resp) => 
{
    const results = galleries.filter(p => p.GalleryCountry.toLowerCase() == req.params.country ||p.GalleryCountry.toUpperCase() == req.params.country || p.GalleryCountry == req.params.country)
    if(results.length > 0) //checks if a gallery from this country is found, if not it returns a message
    {
        resp.json(results)
    }
    else
    {
        resp.json({message: "Galleries from this country were not found"})
    }

})
