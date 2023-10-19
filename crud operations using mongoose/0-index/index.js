const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('Connected to MongoDB...'))
    .catch(err => console.error(err.message));

const courseSchema = mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course1 = new Course({
        name: 'Node.js Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    });

    const course2 = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'frontend'],
        isPublished: true
    });

    const result1 = await course1.save();
    const result2 = await course2.save();

    console.log(result1);
    console.log(result2);
}

async function getCourse() {
    const result = await Course
        .find({ author: /.*Mosh.*/i })
        .and([ { author: 'Mosh' }, { isPublished: true } ])
        .count();
    console.log(result);
}

async function updateCourse(id) {
    const course = await Course.findById(id);
    if (!course)
        return;

    course.isPublished = true;
    course.author = 'Another Author';

    const result = await course.save();
    console.log(result);
}

async function updateCourse2(id) {
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            isPublished: false,
            author: 'Another'
        }
    });
    console.log(result);
}
async function updateCourse3(id) {
    const result = await Course.findByIdAndUpdate(id, {
        $set: {
            isPublished: true,
            author: 'B'
        }
    });
    console.log(result);
}

async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}
async function removeCourse2(id) {
    const result = await Course.findByIdAndDelete(id);
    console.log(result);
}

//createCourse();
//getCourse();
//updateCourse('65226f4e1e42f35314204cd1');
//updateCourse2('65226f4e1e42f35314204cd1');
//updateCourse3('65226f4e1e42f35314204cd1');
//removeCourse('65226f4e1e42f35314204cd1');
removeCourse2('65226f4e1e42f35314204cd0');
