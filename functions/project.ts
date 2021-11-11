import { Handler } from "@netlify/functions";
import Project from '../src/models/Project';
import '../src/database';

const handler: Handler = async (event, context) => {
  const path: string = event.path;
  const method: string = event.httpMethod;
  const headers: any = event.headers;

  if (path.endsWith("getAll") && method == "GET") {
    try {
      let allProjects = await Project.find({});

      console.log(allProjects);

      return({
        statusCode: 200,
        body: JSON.stringify(allProjects)
      });
    }
    catch(err) {
      return({
        statusCode: 500,
        body: JSON.stringify(err)
      });
    }
  }
  else {
    return({
      statusCode: 404,
      body: JSON.stringify(event)
    })
  }
};

export { handler };