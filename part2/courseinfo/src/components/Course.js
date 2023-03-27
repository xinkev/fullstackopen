const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        <Part
            part={parts[0]}
        />
        <Part
            part={parts[1]}
        />
        <Part
            part={parts[2]}
        />
    </>

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>

const Course = ({ course }) => {

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total sum={course.parts.reduce((accu, part) => accu + part.exercises, 0)} />
        </div>
    )
}

export default Course
