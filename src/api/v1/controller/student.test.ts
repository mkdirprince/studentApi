import app from "../../../app";
import supertest from "supertest";
import { students } from "../../../db/schema";
import { db } from "../../../db/db";
import studentService from "../services/student";
import { beforeEach, describe, test, after } from "node:test";
import assert from "node:assert";

import { client } from "../../../db/db";

const api = supertest(app);

const baseUrl = "/api/v1/students";

const initialStudents = [
  {
    firstName: "Yaw",
    lastName: "Mensah",
    email: "yaw@email.com",
    password: "secretadmin",
    programme: "Maths",
  },
  {
    firstName: "David",
    lastName: "Asare",
    email: "sonofdavid@email.com",
    password: "secretadmin",
    programme: "English",
  },
  {
    firstName: "Dennise",
    lastName: "Oteng",
    email: "dennise@email.com",
    password: "secretadmin",
    programme: "French",
  },
];

const studentsInDb = async () => {
  const students = await studentService.getAllStudents();
  return students;
};

describe("student api", () => {
  beforeEach(async () => {
    await db.delete(students);
    for (const student of initialStudents) {
      await studentService.addStudent(student);
    }
  });

  test("all students are returned", async () => {
    const response = await api.get(baseUrl).expect(200);
    assert.strictEqual(response.body.length, initialStudents.length);
  });

  test("a valid student can be added", async () => {
    const newStudent = {
      firstName: "Willy",
      lastName: "Mike",
      email: "willy@yahoo.com",
      password: "secretadmin",
      programme: "English",
    };

    const response = await api
      .post(baseUrl)
      .send(newStudent)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const body = response.body;
    assert(body);
    assert.strictEqual(body.firstName, "Willy");
    assert.strictEqual(
      initialStudents.length + 1,
      (await studentsInDb()).length
    );
  });

  test("returns a student if a vlaid id is provided", async () => {
    const studentAtStart = await studentsInDb();

    const student = studentAtStart[0];

    const id = student.id;

    const data = await api
      .get(`${baseUrl}/${id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.deepStrictEqual(data.body, student);
  });

  test("returns status code 400 if an invalid id is provided", async () => {
    await api.get(`${baseUrl}/q329ijqweoqwe`).expect(400);

    assert.strictEqual((await studentsInDb()).length, initialStudents.length);
  });

  test("successfully updates students info", async () => {
    const studentAtStart = await studentsInDb();

    const { id, ...student } = studentAtStart[0];

    const updatedProgramme = "Physio";
    const updatStudent = {
      ...student,
      programme: updatedProgramme,
    };

    const response = await api
      .put(`${baseUrl}/${id}`)
      .send(updatStudent)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.programme, updatedProgramme);
  });

  test("return status code 400 Bad Request if missing student info", async () => {
    const newStudent = {
      firstName: "Willy",
      lastName: "Mike",
      email: "willy@yahoo.com",
      password: "secretadmin",
    };

    await api.post(baseUrl).send(newStudent).expect(400);

    assert.strictEqual((await studentsInDb()).length, initialStudents.length);
  });

  test("return status code 400 Bad Request if email is not unique", async () => {
    const newStudent = {
      firstName: "Yaw",
      lastName: "Mensah",
      email: "yaw@email.com",
      password: "secretadmin",
      programme: "Maths",
    };
    await api.post(baseUrl).send(newStudent).expect(400);

    assert.strictEqual((await studentsInDb()).length, initialStudents.length);
  });

  test("deleting a single student resource is successful", async () => {
    const studentAtStart = await studentsInDb();

    const { id, ...studentToDelete } = studentAtStart[0];

    await api.delete(`${baseUrl}/${id}`).expect(204);

    const studentsAtEnd = await studentsInDb();

    const emails = studentsAtEnd.map((obj) => obj.email);

    assert.strictEqual(studentsAtEnd.length, initialStudents.length - 1);
    assert(!emails.includes(studentToDelete.email));
  });

  after(async () => {
    await client.end();
  });
});
