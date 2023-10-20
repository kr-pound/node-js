const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => console.log('Connected to MongoDB...'))
    .catch(err => console.error(err.message));

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    category: {
        type: String,
        required: true,
        enum: ['web', 'mobile', 'network']
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            isAsync: true,
            validator: function(v, callback) {
                setTimeout(() => {
                    const result = v && v.length > 0;
                    callback(result);
                }, 4000);
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() {
            return this.isPublished;
        },
        min: 10,
        max: 200
    }
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course1 = new Course({
        name: 'Node.js Course',
        category: '-',
        author: 'Mosh',
        tags: null,
        isPublished: true,
        price: 15
    });

    const course2 = new Course({
        name: 'Angular Course',
        author: 'Mosh',
        tags: ['angular', 'backend'],
        isPublished: true
    });

    try {
        //await course1.validate();
        const result1 = await course1.save();
        const result2 = await course2.save();

        console.log(result1);
        console.log(result2);

    } catch (e) {
        for (field in e.errors) {
            console.error(e.errors[field].message);
        }
    }
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

createCourse();
//getCourse();
//updateCourse('65226f4e1e42f35314204cd1');
//updateCourse2('65226f4e1e42f35314204cd1');
//updateCourse3('65226f4e1e42f35314204cd1');
//removeCourse('65226f4e1e42f35314204cd1');
//removeCourse2('65226f4e1e42f35314204cd0');
