const Header = ({ course }) => <h2>{course.name}</h2>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map(part =>
            <Part part={part} />
        )}
    </>

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>

const Course = ({ course }) => {

    return (
        <div>
            <h1>Web development cirriculum</h1>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total sum={course.parts.reduce((accu, part) => accu + part.exercises, 0)} />
        </div>
    )
}

export default Course
