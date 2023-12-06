const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: {
    type: [ authorSchema ],
    required: true
  }
}));

async function createCourse(name, authors) {

  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function addAuthor(courseId, author) {

  const course = await Course.findById(courseId);

  course.authors.push(author);
  const result = await course.save();

  console.log(result);
}

async function removeAuthor(courseId, authorId) {

  const course = await Course.findById(courseId);

  course.authors.remove(authorId);
  const result = await course.save();

  console.log(result);
}

/*
createCourse('Node Course',[
  new Author({ name: 'Mosh' }),
  new Author({ name: 'John' })
]);*/

//addAuthor('655eda58d23b356c1f4e08a3', new Author({ name: 'Amy' }));
removeAuthor('655eda58d23b356c1f4e08a3', '655eda676ddec59fddd2e074');
