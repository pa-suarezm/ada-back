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

      return({
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
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
  else if (path.endsWith("create") && method == "POST") {
    console.log(event);
    const body = JSON.parse(event.body);
    console.log(body)
    try {
      let { user, type, status, name, date_delivery, description } = body;
      let newProject = new Project({ user, type, status, name, date_delivery, description });
      let responseSave = await newProject.save();
      return({
        statusCode: 200,
        body: JSON.stringify(responseSave)
      });
    }
    catch (err) {
      return({
        statusCode: 500,
        body: JSON.stringify(err)
      })
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