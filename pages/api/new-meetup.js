// /api/new-meetup

import {MongoClient} from 'mongodb'

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // const {title, image, address, description} = data; // in the end we didn't use the deestructured data
        
        const client = await MongoClient.connect("mongodb+srv://teste:mudar123@cluster0.comn0rn.mongodb.net/meetups?retryWrites=true&w=majority");
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message:"Meetup inserted"});
    }
}

export default handler;