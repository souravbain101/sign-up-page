const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const first=req.body.first;
    const last=req.body.last;
    const email=req.body.email;

    var data={
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : first,
                    LNAME : last
                }
            }
        ]
    };
    var json=JSON.stringify(data);
    const url=" https://us8.api.mailchimp.com/3.0/lists/a4dca304f5";
    const options={
        method : "POST",
        auth : "sourav1:b77f671c29970d684964fa6852311a01-us8"
    }
    const request=https.request(url,options,function(response){

        if (response.statusCode===200) {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(json);
    request.end();

    
});

    app.post("/failure",function(req,res){
        res.redirect("/");
    });


app.listen(3000,function(){
    console.log("Server is running at port 3000");

})

// api Key
// b77f671c29970d684964fa6852311a01-us8
// Id
// a4dca304f5
