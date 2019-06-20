const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const hbs = require("hbs");
const jsonParser = express.json();
app.set("view engine", "hbs");
const coll = {
    medicalInstitutionsModel: require("./tables_models/medicalInstitutions"),
    polikliniksModel: require("./tables_models/polikliniks"),
    hospitalsModel: require("./tables_models/hospitals"),
    postsModel: require("./tables_models/posts"),
    profilesLabaratoryModel: require("./tables_models/profilesLabaratory"),
    corpusModel: require("./tables_models/corpus"),
    departmentModel: require("./tables_models/department"),
    labaratoryModel: require("./tables_models/labaratory"),
    naukzvannyaModel: require("./tables_models/naukzvannya"),
    dogtorsModel: require("./tables_models/dogtors"),
    staffsModel: require("./tables_models/staffs"),
    patientsModel: require("./tables_models/patients"),
    surgeonsModel: require("./tables_models/surgeons"),
    terapevtsModel: require("./tables_models/terapevts"),
    nevropatologsModel: require("./tables_models/nevropatologs"),
    ottolaringologsModel: require("./tables_models/ottolaringologs"),
    hinegologsModel: require("./tables_models/hinegologs"),
    stomatologsModel: require("./tables_models/stomatologs"),
    rentgenologsModel: require("./tables_models/rentgenologs")
};

const collTab = {
    "medicalInstitutions": mongoose.model("medicalInstitutions", coll["medicalInstitutionsModel"].scheme()),
    "polikliniks": mongoose.model("polikliniks", coll["polikliniksModel"].scheme()),
    "hospitals": mongoose.model("hospitals", coll["hospitalsModel"].scheme()),
    "posts": mongoose.model("posts", coll["postsModel"].scheme()),
    "profilesLabaratory": mongoose.model("profilesLabaratory", coll["profilesLabaratoryModel"].scheme()),
    "corpus": mongoose.model("corpus", coll["corpusModel"].scheme()),
    "department": mongoose.model("department", coll["departmentModel"].scheme()),
    "labaratory": mongoose.model("labaratory", coll["labaratoryModel"].scheme()),
    "naukzvannya": mongoose.model("naukzvannya", coll["naukzvannyaModel"].scheme()),
    "dogtors": mongoose.model("dogtors", coll["dogtorsModel"].scheme()),
    "staffs": mongoose.model("staffs", coll["staffsModel"].scheme()),
    "patients": mongoose.model("patients", coll["patientsModel"].scheme()),
    "surgeons": mongoose.model("surgeons", coll["surgeonsModel"].scheme()),
    "terapevts": mongoose.model("terapevts", coll["terapevtsModel"].scheme()),
    "nevropatologs": mongoose.model("nevropatologs", coll["nevropatologsModel"].scheme()),
    "hinegologs": mongoose.model("hinegologs", coll["hinegologsModel"].scheme()),
    "ottolaringologs": mongoose.model("ottolaringologs", coll["ottolaringologsModel"].scheme()),
    "stomatologs": mongoose.model("stomatologs", coll["stomatologsModel"].scheme()),
    "rentgenologs": mongoose.model("rentgenologs", coll["rentgenologsModel"].scheme())
}

mongoose.connect("mongodb://heroku_216dzwn6:740t2la6claquv4s9h0t4c18qe@ds341247.mlab.com:41247/heroku_216dzwn6", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    app.listen(41247, function(){
        console.log("Підключення...");
    });
});



let dbClient;

app.use(express.static(__dirname + "/public"));

app.get("/:table", function(req, res) {
    
    const table = req.params["table"];
    let o = "";
    collTab[table].find({}, function(err, tab){
        
        // console.log(tab["0"]["_doc"]);

        if (err) return console.log(err);

        res.render("collectionView.hbs",{
            title: table,
            tt: tab
        })
    ;});
});


app.post("/:table", function(req,res){
    const table = req.params["table"];
    if (!req.body) return res.sendStatus(400);
    console.log(req._id);
});



hbs.registerHelper("adaptiveForm", function(t, tn) {
    let outTable = `<table><tbody><tr>`;
    let outForm = `<div id="divFormParent"><form action="./${String(tn)}" method="post" name="jobForm">`;
    let countDocs = t.length;
    let colums  = Object.getOwnPropertyNames(t["0"]["_doc"]);

    for (let i=0; i<colums.length; i++) {
        outForm+=`<div class="ROW${colums[i]}"><label for="${colums[i]}">${colums[i]}</label><br/><input type="text" class="form-control" name="${colums[i]}"/></div>`;
    }
    outForm+=`<input type="submit" value="Add"/></form></div>`;

    //Будування заголовків коллекції
    for (let i=0; i<colums.length; i++) {
        outTable+=`<th>${colums[i]}</th>`;
    }
    outTable+=`</tr>`;

    //Будування документів
    for (let i=0; i<t.length; i++) {
        outTable+=`<tr data-rowid='${t[i]["_doc"]["_id"]}'><form action="./${String(tn)}" name="jobTable">`;
        for (var j in t[i]["_doc"]) {
            outTable+=`<td><input type="text" value="${t[i]["_doc"][j]}"/></td>`;
        }
        outTable+=`<td><button id="updBtn">Update</button></td><td><button id="delBtn">Delete</button></td></form></tr>`;
    }

    outTable+=`</tbody></table>`;

    return new hbs.SafeString(outForm + outTable);
});


process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});