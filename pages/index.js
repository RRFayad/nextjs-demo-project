import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 5, 12345, Some City",
//     description: "This is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address 500, 9999, Some City",
//     description: "This is a second meetup",
//   },
// ];

function HomePage(props) {
  // We don't need sideeffect and states anymore to the first fetch data, because now we are getting the data through props (from the getStaticPages)

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta 
        name="description"
        content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
}

// export async function getServerSideProps(context) { // This function will not run in the build process, but always in the server side after deployment

//   const req = context.req; //request
//   const res = context.res; //response

//   // Fetch data form API or from a file
//   return {
//     props:{
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://teste:mudar123@cluster0.comn0rn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    // We always need to return a object
    props: {
      // We always need to return props object
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // number os seconds that the page will take to be auto re generated (to let us have the updated data)
  };
}

export default HomePage;
