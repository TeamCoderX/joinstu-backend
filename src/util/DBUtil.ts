import { MongoClient } from 'mongodb';


// **** Variables **** //

const mongoURI = process.env.MONGO_URI;
export const dbClient = new MongoClient(mongoURI ?? 'mongodb://localhost:27017');


// **** Functions **** //

/**
 * unique id generator
 */
export function generateID(db: string, collection: string): string {
  let randomID = (Math.random() + 1).toString(10).substring(7);
  dbClient.db(db).collection(collection).findOne({ id: randomID })
    .then((result) => {
      if (result) {
        randomID = generateID(db, collection);
      }
    })
  return randomID;
}




// **** Export Default **** //

export default {
  generateID,
} as const;
