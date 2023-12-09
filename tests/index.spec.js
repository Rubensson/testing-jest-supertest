// testeando app
import app from "../src/app";
import request from "supertest";
//jest functions
// describe(),
describe("GET /tasks", () => {
  // test()
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/tasks").send();
    // console.log(response);
    // uso de expect()
    // uso de toBe()
    expect(response.statusCode).toBe(200); //en el caso de que no exista "/tasks" nos dará 404, y comprobará que no corresponde a 200, que es lo esperado..
  });

  test("should respose with an array", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.body).toBeInstanceOf(Array); //comprobando que en "/tasks" , el cuerpo de la respuesta es un array..
  });
});

describe("POST /tasks", () => {
  //testear cuando POST en el siguiente endpoint

  describe("given title and description", () => {
    // test mientras contamos con un title y description

    const newTask = {
      title: "test title",
      description: "test description",
    };
    //definir lo que queremos comprobar:

    // should respond with a 200 status code
    test("Should respond with a 200 status code", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.statusCode).toBe(200);
    });

    // should respond with a content-type of application/json
    test("should respond with a content-type of application/json in header", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    // should respond with a json object containing the task with a id
    test("should respond with a task ID", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.body.id).toBeDefined();
    });
  });

  //test en el caso donde no contamos con title o description
  /* describe("title and description missing", () => {
    test("should respond with a 400 status code", async () => {
      const response = await request(app).post("/tasks").send({ title: "" });
      expect(response.statusCode).toBe(400);
    });
  }); */
  describe("title and description missing", () => {
    // para comprobar en diferentes casos (fields)

    test("should respond with a 400 status code", async () => {
      const fields = [
        {},
        { title: "test task" },
        {
          description: "test description",
        },
      ];
      for (const body of fields) {
        const response = await request(app).post("/tasks").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
// Continuar video 24:44
