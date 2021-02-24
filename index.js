const express = require("express");
const { WebhookClient } = require("dialogflow-fulfillment");
const app = express();

const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var randomstring = require("randomstring"); 

app.post("/dialogflow", express.json(), (req, res) => {
    const agent = new WebhookClient({ 
		request: req, response: res 
        });

const client = new MongoClient(url,{useUnifiedTopology: true});

async function welcome_note(agent)
{
    agent.add("Hello! Welcome to NGIT Placement Cell.");
    agent.add(" Enter the given passcode to continue.");
}

async function identify_user(agent)
{
    const Company_Passcode = agent.parameters.number
    await client.connect();
    const snap = await client.db("college").collection("company_vistited").findOne({Company_Passcode: Company_Passcode});
    
    if(snap==null){
        await agent.add("Oops!! There is no such Company registered with this Passcode.\n Enter START to restart the conversation");

    }
    else
    {
    user_name=snap.Company_Name;
    await agent.add("Welcome  "+user_name+"!!  \n Enter OK to continue");}
}

async function get_third_year_details(agent)
{
    const ug_gpa = agent.parameters.ug_gpa
    const senior_secondary = agent.parameters.senior_secondary
    const tenth_gpa = agent.parameters.tenth_gpa
    try
    {

        await client.connect();
        const databse = client.db("college");
        const collection = databse.collection("3rd_year");
        const query={Intermediate_Percantage:{$gt:senior_secondary},tenth_CGPA:{$gt:tenth_gpa},Avg_present_GPA:{$gt:ug_gpa}};
        const cursor = collection.find(query);
        const num = await client.db("college").collection("3rd_year").countDocuments(query);
        if ((await cursor.count()) === 0) 
        {
            agent.add("There are no students based on your given criteria")
        }
        else
        {
            if(num>1)
            {
                agent.add("There are "+num+" students sorted based on your given crietria");
                agent.add("Click the below link to view the selected students details");
                
            }
            else
            {
                agent.add("There is "+num+" student sorted based onyour given crietria");
                agent.add("Click the below link to view the selected student details");
            }
            

        }

    }
    finally {
        await client.close();
    }
    
    
}
async function get_fourth_year_details(agent)
{
    const ug_gpa = agent.parameters.ug_gpa
    const senior_secondary = agent.parameters.senior_secondary
    const tenth_gpa = agent.parameters.tenth_gpa
    try
    {

        await client.connect();
        const databse = client.db("college");
        const collection = databse.collection("4th_year");
        const query={Intermediate_Percantage:{$gt:senior_secondary},tenth_CGPA:{$gt:tenth_gpa},Avg_present_GPA:{$gt:ug_gpa}};
        const cursor = collection.find(query);
        const num = await client.db("college").collection("4th_year").countDocuments(query);
        if ((await cursor.count()) === 0) 
        {
            agent.add("There are no students based on your given criteria")
        }
        else
        {
            if(num>1)
            {
                agent.add("There are "+num+" students sorted based on your given crietria");
                agent.add("Click the below link to view the selected students details");
                
            }
            else
            {
                agent.add("There is "+num+" student sorted based onyour given crietria");
                agent.add("Click the below link to view the selected student details");
            }
            
            
        }

    }
    finally {
        await client.close();
    }
    
    
}
async function get_both_year_details(agent)
{
    const ug_gpa = agent.parameters.ug_gpa
    const senior_secondary = agent.parameters.senior_secondary
    const tenth_gpa = agent.parameters.tenth_gpa
    try
    {

        await client.connect();
        const databse = client.db("college");
        const collection = databse.collection("both");
        const query={Intermediate_Percantage:{$gt:senior_secondary},tenth_CGPA:{$gt:tenth_gpa},Avg_present_GPA:{$gt:ug_gpa}};
        const cursor = collection.find(query);
        const num = await client.db("college").collection("both").countDocuments(query);
        if ((await cursor.count()) === 0) 
        {
            agent.add("There are no students based on your given criteria")
        }
        else
        {
            if(num>1)
            {
                agent.add("There are "+num+" students sorted based on your given crietria");
                agent.add("Click the below link to view the selected students details");
                
            }
            else
            {
                agent.add("There is "+num+" student sorted based onyour given crietria");
                agent.add("Click the below link to view the selected student details");
            }
            

        }

    }
    finally {
        await client.close();
    }
    
    
}
    




var intentMap = new Map();
intentMap.set("Company_Name", identify_user);
intentMap.set("3rd_year",get_third_year_details);
intentMap.set("4th_year",get_fourth_year_details);
intentMap.set("both",get_both_year_details);
intentMap.set("Default_Welcome_Intent",welcome_note);



agent.handleRequest(intentMap);

});

app.listen(process.env.PORT || 8080);
        
        