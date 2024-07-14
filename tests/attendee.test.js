const mongoose = require("mongoose");
const supertest = require("supertest")
const attendeeController = require("../controllers/attendee-controller");

beforeEach((done) => {
    mongoose.connect(
        'mongodb+srv://thushaltk:thushal1234@cluster0.tivsh.mongodb.net/icafLog?retryWrites=true&w=majority'
    ).then(() => {
        console.log("Connected to Database :)....");
        app.listen(5000, () => {
            console.log("Listening on port 5000....");
        });
    }).catch((err) => {
        console.log(err);
    });
    done();
});

afterEach((done) => {
    mongoose.connection.close(() => done());
})

test("GET all attendee data", async() => {
    const attendee = await attendeeController.getAllAttendeeDetails();
    await supertest(app).get("/api/attendee/")
    .expect(200)
    .then((response) => {
        expect(response.body[0].fullName).toBe(attendee.fullName);
        expect(response.body[0].address).toBe(attendee.address);
        expect(response.body[0].email).toBe(attendee.email);
        expect(response.body[0].mobileNo).toBe(attendee.mobileNo);
        expect(response.body[0].isPaid).toBe(attendee.isPaid);

    })
})